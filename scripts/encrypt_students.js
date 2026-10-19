#!/usr/bin/env node
/**
 * Avant - Versleuteling van Leerlinggegevens (Zero-Knowledge Privacy)
 *
 * Dit script versleutelt leerlingnamen met AES-256-GCM (PBKDF2 SHA-256, 100.000 iteraties).
 * De gegenereerde ciphertext en 10-karakter hashes worden opgeslagen in `data/leerlingen.enc.json`.
 * Er staan NOOIT persoonsgegevens in code of in de publieke repository.
 *
 * Gebruik:
 *   node scripts/encrypt_students.js [wachtwoord] [pad_naar_invoer.json]
 *   Standaard wachtwoord: "avant2026"
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DEFAULT_PASSWORD = process.env.AVANT_PASSPHRASE || process.argv[2] || 'avant2026';
const ROOT_DIR = path.resolve(__dirname, '..');
const INPUT_FILE = process.argv[3] || path.join(ROOT_DIR, 'data', 'leerlingen.local.json');
const OUTPUT_FILE = path.join(ROOT_DIR, 'data', 'leerlingen.enc.json');

function hashName(name) {
  const clean = name.trim().replace(/\s+/g, ' ');
  return crypto.createHash('sha256').update(clean, 'utf8').digest('hex').slice(0, 10);
}

function encryptName(name, password, salt) {
  const iv = crypto.randomBytes(12);
  const key = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([
    cipher.update(name.trim(), 'utf8'),
    cipher.final(),
    cipher.getAuthTag()
  ]);
  // Payload: IV (12 bytes) + Ciphertext + Auth Tag (16 bytes)
  return Buffer.concat([iv, encrypted]).toString('base64');
}

function main() {
  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`Invoerbestand niet gevonden: ${INPUT_FILE}`);
    console.error('Maak een lokaal bestand (bijv. data/leerlingen.local.json) aan met de te versleutelen klassen.');
    process.exit(1);
  }

  const rawData = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8'));
  const classesInput = rawData.classes || rawData;

  const salt = crypto.randomBytes(16);
  const result = {
    metadata: {
      algorithm: 'AES-256-GCM',
      kdf: 'PBKDF2-SHA256',
      iterations: 100000,
      salt: salt.toString('base64'),
      hashAlgorithm: 'SHA-256',
      hashLength: 10,
      updatedAt: new Date().toISOString()
    },
    classes: {}
  };

  let totalEncrypted = 0;

  for (const [className, students] of Object.entries(classesInput)) {
    result.classes[className] = [];
    for (const student of students) {
      const name = typeof student === 'string' ? student : student.name;
      if (!name) continue;

      const h = student.hash || hashName(name);
      const enc = encryptName(name, DEFAULT_PASSWORD, salt);

      result.classes[className].append ? result.classes[className].append : result.classes[className].push({
        hash: h,
        enc: enc
      });
      totalEncrypted++;
    }
  }

  const jsonContent = JSON.stringify(result, null, 2) + '\n';
  fs.writeFileSync(OUTPUT_FILE, jsonContent, 'utf8');
  const altFile = path.join(ROOT_DIR, 'data', 'leerlingen_enc.json');
  fs.writeFileSync(altFile, jsonContent, 'utf8');
  console.log(`✅ Succesvol ${totalEncrypted} leerlingen versleuteld naar: ${OUTPUT_FILE}`);
  console.log(`🔑 Gebruikt wachtwoord: "${DEFAULT_PASSWORD}"`);
  console.log('🔒 Geen enkele persoonsnaam is in platte tekst opgeslagen.');
}

main();
