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

function updateMarkdownWeights(content, submissionData) {
  if (!submissionData || typeof submissionData !== 'object') return content;
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!fmMatch) return content;

  let fm = fmMatch[1];
  const body = fmMatch[2];
  const subIds = Object.keys(submissionData);
  const isMulti = fm.includes('indieningen:');

  if (isMulti) {
    subIds.forEach((subId) => {
      const subInfo = submissionData[subId];
      if (!subInfo) return;

      const subRegex = new RegExp(`(  - id:\\s*["']?${subId}["']?[\\s\\S]*?)(?=\\n  - id:|\\n[a-zA-Z0-9_-]+:|$)`);
      fm = fm.replace(subRegex, (subBlock) => {
        let updatedBlock = subBlock;

        // 1. Totaalgewicht van de indiening
        if (typeof subInfo.weight === 'number') {
          if (/(\n\s*gewicht:\s*)\d+/.test(updatedBlock)) {
            updatedBlock = updatedBlock.replace(/(\n\s*gewicht:\s*)\d+/, `$1${subInfo.weight}`);
          } else {
            if (/(\n\s*lesuren:\s*\d+)/.test(updatedBlock)) {
              updatedBlock = updatedBlock.replace(/(\n\s*lesuren:\s*\d+)/, `$1\n    gewicht: ${subInfo.weight}`);
            } else if (/(\n\s*titel:\s*["'][^"']*["'])/.test(updatedBlock)) {
              updatedBlock = updatedBlock.replace(/(\n\s*titel:\s*["'][^"']*["'])/, `$1\n    gewicht: ${subInfo.weight}`);
            }
          }
        }

        // 2. Gewichten per succescriterium binnen deze indiening
        const critWeights = subInfo.criteriaWeights || {};
        Object.entries(critWeights).forEach(([code, w]) => {
          const critRegex = new RegExp(`(\\n\\s+- code:\\s*["']?${code}["']?[\\s\\S]*?)(?=\\n\\s+- code:|\\n  - id:|\\n[a-zA-Z0-9_-]+:|$)`);
          updatedBlock = updatedBlock.replace(critRegex, (critItem) => {
            if (/(\n\s+gewicht:\s*)\d+/.test(critItem)) {
              return critItem.replace(/(\n\s+gewicht:\s*)\d+/, `$1${w}`);
            } else {
              return critItem.replace(/(\n\s+- code:\s*["']?[^"'\n]+["']?)/, `$1\n        gewicht: ${w}`);
            }
          });
        });

        return updatedBlock;
      });
    });
  } else {
    // Enkele indiening
    const firstSub = submissionData[subIds[0]] || Object.values(submissionData)[0];
    if (firstSub) {
      // 1. Totaalgewicht op hoofdniveau
      if (typeof firstSub.weight === 'number') {
        if (/^(\s*gewicht:\s*)\d+/m.test(fm)) {
          fm = fm.replace(/^(\s*gewicht:\s*)\d+/m, `$1${firstSub.weight}`);
        } else {
          if (/^(\s*leerplandoelen:)/m.test(fm)) {
            fm = fm.replace(/^(\s*leerplandoelen:)/m, `gewicht: ${firstSub.weight}\n$1`);
          }
        }
      }

      // 2. Gewichten per succescriterium
      const critWeights = firstSub.criteriaWeights || {};
      Object.entries(critWeights).forEach(([code, w]) => {
        const critRegex = new RegExp(`(\\n\\s*- code:\\s*["']?${code}["']?[\\s\\S]*?)(?=\\n\\s*- code:|\\n[a-zA-Z0-9_-]+:|$)`);
        fm = fm.replace(critRegex, (critItem) => {
          if (/(\n\s+gewicht:\s*)\d+/.test(critItem)) {
            return critItem.replace(/(\n\s+gewicht:\s*)\d+/, `$1${w}`);
          } else {
            return critItem.replace(/(\n\s*- code:\s*["']?[^"'\n]+["']?)/, `$1\n    gewicht: ${w}`);
          }
        });
      });
    }
  }

  return `---\n${fm}\n---\n${body}`;
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

        // 1. Schrijf direct weg naar data/
        fs.writeFileSync(targetPath, jsonString, 'utf8');
        console.log(`[Save Server] ✅ Succesvol opgeslagen: data/${filename} (${new Date().toLocaleTimeString()})`);

        // 2. Schrijf eventueel gewichten weg naar het corresponderende markdownbestand
        let mdUpdated = false;
        const rawFilePath = (payload.filePath || '').trim();
        if (rawFilePath) {
          const cleanRel = rawFilePath.replace(/^content[\\/]/, '');
          const mdFullPath = path.join(ROOT_DIR, 'content', cleanRel);

          if (fs.existsSync(mdFullPath) && mdFullPath.endsWith('.md')) {
            try {
              const currentMd = fs.readFileSync(mdFullPath, 'utf8');
              const submissionsData = (dataToSave && dataToSave.submissions) || {};
              const updatedMd = updateMarkdownWeights(currentMd, submissionsData);
              if (updatedMd !== currentMd) {
                fs.writeFileSync(mdFullPath, updatedMd, 'utf8');
                mdUpdated = true;
                console.log(`[Save Server] 📝 Markdown frontmatter gewichten bijgewerkt: content/${cleanRel}`);
              }
            } catch (mdErr) {
              console.error(`[Save Server] ⚠️ Kon markdown niet bijwerken (${mdFullPath}):`, mdErr.message);
            }
          }
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          ok: true,
          filename: filename,
          path: `data/${filename}`,
          markdownUpdated: mdUpdated,
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
