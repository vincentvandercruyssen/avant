#!/usr/bin/env node
/**
 * Avant Local Grading Pipeline - Direct File System Save Server
 *
 * Dit script biedt een lokale HTTP API (poort 1315) waarmee de browser
 * beoordelingen (rubriek-*.json) direct kan opslaan in de map:
 * /Users/vincentvandercruyssen/Documents/hugo/avant/data/
 *
 * Geen externe dependencies vereist (gebruikt uitsluitend native Node.js modules).
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 1315;
const ROOT_DIR = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'data');

// Zorg dat de data-map bestaat
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Private-Network', 'true');
}

const server = http.createServer((req, res) => {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (req.method === 'GET' && url.pathname === '/api/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      ok: true,
      port: PORT,
      rootDir: ROOT_DIR,
      dataDir: DATA_DIR,
      timestamp: new Date().toISOString()
    }));
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/save-rubriek') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      // Bescherm tegen te grote payloads (> 10MB)
      if (body.length > 10 * 1024 * 1024) {
        req.destroy();
      }
    });

    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        let filename = (payload.filename || '').trim();

        if (!filename) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: false, error: 'Geen bestandsnaam opgegeven' }));
          return;
        }

        // Veiligheidscontrole: sta enkel alfanumerieke tekens, streepjes en .json toe
        if (!/^[a-zA-Z0-9_\-]+\.json$/.test(filename)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: false, error: 'Ongeldige bestandsnaam (alleen veilige .json namen toegestaan)' }));
          return;
        }

        const dataToSave = payload.data || payload;
        const targetPath = path.join(DATA_DIR, filename);
        const jsonString = JSON.stringify(dataToSave, null, 2) + '\n';

        // Schrijf direct weg naar data/
        fs.writeFileSync(targetPath, jsonString, 'utf8');

        console.log(`[Save Server] ✅ Succesvol opgeslagen: data/${filename} (${new Date().toLocaleTimeString()})`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          ok: true,
          filename: filename,
          path: `data/${filename}`,
          savedAt: new Date().toISOString(),
          displayTime: new Date().toLocaleTimeString()
        }));
      } catch (err) {
        console.error('[Save Server] Fout bij verwerken:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: err.message }));
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ok: false, error: 'Endpoint niet gevonden' }));
});

server.listen(PORT, () => {
  console.log(`[Save Server] 🚀 Actief op poort ${PORT} (IPv4 & IPv6)`);
  console.log(`[Save Server] 📁 Doelmap voor data: ${DATA_DIR}`);
});

module.exports = server;
