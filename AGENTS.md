# Agent Instructions for Avant

- **Hugo Port**: Always use port `1313` (`hugo server -p 1313` or `npm run dev`).
- **Single Instance**: Hugo watches files and live-reloads automatically. Before starting a server, check if Hugo is already running on port 1313. Never start a second server on a different port (e.g. 1314).
- **Headings & Numbering**: Do NOT use manual numbering or phase prefixes (e.g. `Fase 1:`, `Stap 1:`, `1.`, `2.`) in Markdown headings (`###`, `####`, `#####`). The TOC and CSS counters handle hierarchical numbering automatically.
- **No Horizontal Rules**: Do NOT use `---` / `<hr>` in the Markdown body of assignments or planning files.
- **Tone**: Direct, activating address to the student (*je / jij / jouw* or imperative). Never use plural *we / wij / laten we*.
- **Sentence Case**: Use sentence case for headings (only capitalize first word and proper nouns).

