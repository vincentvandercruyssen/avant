#!/usr/bin/env node
/**
 * Avant Development Runner
 *
 * Start zowel de Hugo webserver (poort 1313) als de lokale Save Server (poort 1315).
 * Hierdoor worden puntenaanpassingen in de browser direct opgeslagen in avant/data/.
 */

const { spawn } = require('child_process');
const path = require('path');

// 1. Start Save Server
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
