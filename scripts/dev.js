#!/usr/bin/env node
/**
 * Avant Development Runner
 *
 * English:
 * Starts both the Hugo local development server (port 1313) and the local Save Server (port 1315).
 * Automatically mirrors single-source grading assets from assets/ to static/ at startup and on save.
 *
 * Nederlands:
 * Start zowel de Hugo webserver (poort 1313) als de lokale Save Server (poort 1315).
 * Spiegelt werkbestanden automatisch van assets/ naar static/ bij opstarten en bij opslaan.
 * Hierdoor worden puntenaanpassingen in de browser direct opgeslagen in avant/data/.
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// 1. Asset Mirroring: assets/ (source of truth) -> static/ (production & fallback mirror)
//    Automatische spiegeling: assets/ (bron) -> static/ (mirror voor productie/fallbacks)
const MIRROR_FILES = [
  { src: '../assets/css/grading.css', dest: '../static/css/grading.css' },
  { src: '../assets/js/rubriek.js', dest: '../static/js/rubriek.js' }
];

function syncFile(relSrc, relDest) {
  try {
    const src = path.resolve(__dirname, relSrc);
    const dest = path.resolve(__dirname, relDest);
    if (!fs.existsSync(src)) return;

    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const srcBuf = fs.readFileSync(src);
    const destBuf = fs.existsSync(dest) ? fs.readFileSync(dest) : null;

    if (!destBuf || !srcBuf.equals(destBuf)) {
      fs.writeFileSync(dest, srcBuf);
      console.log(`[Mirror] 🔄 Gespiegeld: ${relSrc.replace('../', '')} -> ${relDest.replace('../', '')}`);
    }
  } catch (err) {
    console.error(`[Mirror] ⚠️ Fout bij spiegelen van ${relSrc}:`, err.message);
  }
}

function initMirrors() {
  MIRROR_FILES.forEach((f) => {
    syncFile(f.src, f.dest);
    const srcPath = path.resolve(__dirname, f.src);
    if (fs.existsSync(srcPath)) {
      fs.watchFile(srcPath, { interval: 500 }, () => syncFile(f.src, f.dest));
    }
  });
}

initMirrors();

// 2. Start Save Server
require('./save_server');

// 2. Start Hugo server op poort 1313
const hugo = spawn('hugo', ['server', '-p', '1313'], {
  cwd: path.resolve(__dirname, '..'),
  stdio: 'inherit'
});

hugo.on('error', (err) => {
  console.error('[Dev Runner] Fout bij starten van Hugo:', err);
});

hugo.on('exit', (code) => {
  process.exit(code || 0);
});

process.on('SIGINT', () => {
  hugo.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  hugo.kill('SIGTERM');
  process.exit(0);
});
