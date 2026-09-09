# Agent Instructions for Avant

- **Hugo Port**: Always use port `1313` (`hugo server -p 1313` or `npm run dev`).
- **Single Instance**: Hugo watches files and live-reloads automatically. Before starting a server, check if Hugo is already running on port 1313. Never start a second server on a different port (e.g. 1314).
- **Headings & Numbering**: Do NOT use manual numbering or phase prefixes (e.g. `Fase 1:`, `Stap 1:`, `1.`, `2.`) in Markdown headings (`###`, `####`, `#####`). The TOC and CSS counters handle hierarchical numbering automatically.
- **No Horizontal Rules**: Do NOT use `---` / `<hr>` in the Markdown body of assignments or planning files.
- **Tone**: Direct, activating address to the student (*je / jij / jouw* or imperative). Never use plural *we / wij / laten we*.
- **Sentence Case**: Use sentence case for headings (only capitalize first word and proper nouns; capitalizing the first word after a colon is permitted, e.g. `### CSS: Vormgeving`).
- **Afbeeldingen & Grids**: Gebruik van `{{< grid >}}` shortcode (of custom gap) om afbeeldingen naast elkaar te plaatsen is niet nodig. Door markdown afbeeldingen direct onder elkaar te plaatsen (zonder witregel ertussen) komen ze in één `<p>` en zorgt de CSS (`p:has(> img:nth-of-type(2))`) automatisch voor een flexbox layout met gelijke kolommen en standaard `1rem` gap.
- **Lesplanning (`planning.md`)**: Hanteer de strakke didactische fiche-stijl uit de README: zakelijk, telegrafisch en functioneel voor de leerkracht (geen wollige handleidingstekst of open deuren zoals "individuele coaching"). Splits het lesverloop op in afzonderlijke didactische kernstappen (bv. theorie of toets als eigen genummerde stap) met maximaal één niveau aan vlakke sub-bullets (`1. -> *`).
