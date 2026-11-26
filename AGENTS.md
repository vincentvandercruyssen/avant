# Agent Instructions for Avant

- **Hugo Port**: Always use port `1313` (`hugo server -p 1313` or `npm run dev`).
- **Single Instance**: Hugo watches files and live-reloads automatically. Before starting a server, check if Hugo is already running on port 1313. Never start a second server on a different port (e.g. 1314).
- **Grading Assets & Mirroring (`assets/` vs `static/`)**: Always edit rubric and grading code **only** in `assets/` (`assets/js/rubriek.js` and `assets/css/grading.css`). Never edit the mirror files in `static/` directly. When running `npm run dev` (`node scripts/dev.js`), changes in `assets/` are automatically mirrored to `static/` at startup and watched live. The files in `static/` serve purely as mirrored copies for production deployments (GitHub Pages) and template fallbacks.
- **Assignment Frontmatter & Title**:
  - Use a concise single keyword for `title:` where possible (e.g. `"Kijkkader"`, `"Loops"`, `"Collagemateriaal"`, `"Beyond Gravity"`).
  - Use `YYYY-MM-DD` for `date:` and `deadline:` fields; list full author names in `auteurs:` and all relevant tools/standards in `software:`.
  - Structure evaluations under `indieningen:` (typically `id: "onderzoek"` and `id: "oplevering"`) with `titel`, `deadline`, `lesuren`, `gewicht`, and `leerplandoelen` (`code`, `gewicht`, `criterium` written in clear student-facing language).
- **Assignment Structure (4 Fixed H2 Sections)**: Every assignment (`index.md`) follows a fixed 4-part structure (in sentence case):
  1. `## Briefing & concept` — Engaging introduction linking the task to practice or the overarching theme, summary of deliverables, and optional mood image/GIF or `{{< pinboard >}}`.
  2. `## Onderzoek` — Inspiration gathering (e.g. five examples and search terms) plus analysis/design choices in a `###` subsection, bundled as `VoornaamA_Kernwoord-Onderzoek.pdf` in `01_onderzoek/` and submitted via Smartschool.
  3. `## Opdracht` — Chronological workflow in `###` and `####` subsections (preparation/sketches, technical specs, production steps, export settings, and optional `### Extra's`).
  4. `## Oplevering` — Smartschool ZIP upload instruction with a `└─` directory tree block (`VoornaamA_Kernwoord.zip` containing `VoornaamA_Kernwoord/` with `01_onderzoek/`, `02_assets/`, `03_exports/`, and source project files), followed directly by `### Checklist` with `####`-subchecks.
- **Headings & Numbering**: Do NOT use manual numbering or phase prefixes (e.g. `Fase 1:`, `Stap 1:`, `1.`, `2.`) in Markdown headings (`###`, `####`, `#####`). The TOC and CSS counters handle hierarchical numbering automatically.
- **No Horizontal Rules**: Do NOT use `---` / `<hr>` in the Markdown body of assignments or planning files.
- **Tone & Vlaams Idiom**: In assignments (opdrachten) and evaluations, use direct, activating address to the student (*je / jij / jouw* or imperative). In theoretical courses (`content/cursus/`), maintain an objective, explanatory reference style suited for 15–18-year-olds (no assignment framing or *je/jij* addressing). Never use plural *we / wij / laten we*. Courante Vlaamse uitdrukkingen, spreektaal en constructies zijn volkomen welkom en klinken vaak veel natuurlijker voor de leerling dan krampachtig formeel of Hollands idioom (bv. *"mankeren"*, *"proper"*, *"in orde zijn"*, *"aanduiden"*, *"had in de map gezeten"*; vermijd typisch noordelijke stopwoorden zoals *"keurig"*, *"hartstikke"* of *"dikke prima"*).
- **Editorial & Typographical Rules (Assignments)**:
  - **Software terms & shortcuts**: Mention both Dutch and English tool names with shortcuts when introducing a tool (`Object selecteren (Object Selection Tool, W)`, `Ctrl + T`, `F9 (Easy Ease)`).
  - **Numbers in prose**: Spell out counts below ten in Dutch prose (*"vijf voorbeelden"*, *"vier composities"*); write technical units, durations, dimensions, and labels as digits (*"minimaal 5 seconden"*, *"30 fps"*, *"1080 px"*, *"Stap 1"*).
  - **Tips & pitfalls**: Place crucial warnings or didactic notes inside Markdown blockquotes (`>`).
  - **Multiple file notation**: Refer concisely to numbered file variants in parentheses, e.g. `VoornaamA_Opdracht-Comp_1.mp4 (2,3,4)` or `VoornaamA_Opdracht-Storyboard-1.jpg (2,3,4) of .pdf`.
- **Feedbackteksten & Smartschool Compatibiliteit**: Gebruik in evaluatiefeedback **nooit letterlijke HTML-tags met `<` en `>`** (zoals `<p>`, `<h1>`, `<a>`). Smartschool stript of interpreteert punthaken als HTML-code, waardoor delen van de tekst wegvallen of verminkt raken. Verwijs naar tags zuiver bij hun tagnaam (bv. `h1`, `p`, `img`, `ul`, `ol`, `li`, `a`).
- **Didactische Evaluatiefeedback (Natuurlijk, Zonder AI-Wolligheid)**:
  - **Natuurlijke, sobere Vlaamse toon**: Schrijf direct, vlot, nuchter en menselijk in de *je/jij*-aanspreekvorm. Vlaams-ismen en spreektaal zijn helemaal oké en klinken authentiek (bv. *"de psd die nu mankeert"*, *"had rechtstreeks in de map gezeten"*, *"oogt wat onhandig"*, *"proper opgebouwd"*). Vermijd uitroeptekens, wollige clichés, plechtige AI-constructies en opgeklopte bijwoorden (*zeer*, *heel*, *bijzonder*, *uitstekend*, *top-*, *voorbeeldig* — schrijf liever *"werkt verhelderend"*, *"is dit een goed vertrekpunt"* i.p.v. *"werkt heel verhelderend"* of *"een zeer goed vertrekpunt om..."*). Houd bij zwakkere prestaties de zinnen kort, helder en direct (geen nodeloos complexe bijzinnen).
  - **Direct formuleren zonder opsommingsinleiders of spec-vinkjes**: Gebruik nooit standaard-inleiders zoals *"Enkele kleine aandachtspunten:"*, *"Enkele werkpuntjes:"* of *"Kleine aandachtspunten:"*. Benoem een vaststelling of werkpunt meteen als een directe zin (*"Er werd geen plaats voorzien voor de typografie."*). Herhaal correcte technische specificaties (zoals *1080 × 1920 px, 30 fps, 12 seconden*) nooit plichtmatig als ze gewoon in orde zijn — benoem specs enkel wanneer er effectief iets fout zit (bv. 25 s i.p.v. max. 15 s). Laat betuttelende randopmerkingen over kleinigheden weg bij propere schetsen; enkel wanneer een schets echt onordelijk of scheef oogt, volstaat een rustig advies (*"Bewaar orde door bijvoorbeeld te werken met een lat."*). Bij volledig ontbrekende of totaal verkeerde indieningen (`0`): houd het bij één à drie droge zinnen zonder uitleg over wat er allemaal in het archief had moeten zitten.
  - **Vaktermen met gerichte ankers (geen onnodige lijstjes)**: Evalueer keuzes in professionele overkoepelende vaktermen (*voorgrondelement*, *secundaire grafische elementen*, *kleursfeer*, *typografisch hoofdwoord*, *animatietechnieken*). Som de eigen keuzes van de leerling niet nodeloos op tussen haakjes (*"De drie principes"* i.p.v. *"De drie principes (Contrast, Color en Proportion)"*), maar gebruik een kort anker tussen haakjes uitsluitend waar het echt helpt om één specifiek onderdeel aan te wijzen (bv. `(bij het onderdeel Color)`, `voorgrondelement (het eendje)`, `ziparchief (leeg mapje "klaar")`).
  - **Compositie en kaderfunctie bij schetsen**: Beoordeel bij storyboards en voorbereidende schetsen niet alleen of elementen aanwezig zijn, maar vooral de compositorische bedoeling: het getekende kader bakent de **gehele compositie** af (inclusief marge en ruimte voor typografie binnen het kader), niet enkel een strak doosje rond de vormen met titels erbuiten. Benoem dit scherp en functioneel (*"Het kader dient als afbakening van de gehele compositie, maar nu zit het kader enkel rond de vormen."*).
  - **Inhoudelijke & technische inspectie van Motion (`.aep` + `.mp4` naast elkaar)**:
    - Gebruik bij video-inspectie een dichte bemonstering (`fps=4` of `fps=5` contactbladen plus begin- en eindframe, bv. via `scripts/inspect_motion.py`) in plaats van enkel 1 frame per seconde, zodat 1-frame-foutjes, plotse sprongen en te korte rustmomenten zichtbaar blijven.
    - Leg het `.aep`-project altijd naast de `.mp4`-render om mismatches te ontdekken (render komt niet overeen met project, achtergrondkleur niet mee uitgerenderd), en bekijk precomp-opbouw, keyframe-hygiëne (ongebruikte keyframes, overbodige lagen), effecten en of lineair dan wel *easing* is toegepast (erken ook wanneer lineair werkt).
    - Onderscheid **functionele rustmomenten** (even pauzeren zodat het principe leesbaar blijft) van **dode tijd** (statisch raster of leeg beeld), en beoordeel typografische consistentie (verspringende plaats, tekstovergangen, ondermarges, spelfouten, hoofdlettergebruik en ontbrekende titel van het werk).
    - Reik waar passend één concreet productie-alternatief aan vanuit de eigen opbouw van de leerling (bv. *Time Remapping* op een animatie-precomp, samenvoegen in één compositie, of naadloos loopen) en erken creatieve of technische vondsten altijd apart — ook bij een onvoldoende.
    - Controleer bij opleveringen steeds of externe (niet-Adobe) lettertypes in de assetsmap zijn meegeleverd en verwijs natuurlijk naar mappen (*"de submappen voor assets en exports"* i.p.v. telkens afkortingen tussen aanhalingstekens te stapelen).
  - **Gedoseerde softwaremechanica**: Leg geen overdreven diepe softwaretheorie uit als een praktische en direct toepasbare hint volstaat (bv. *"3D-functie in de precomp activeren"* of *"easings toepassen"* in plaats van lange uitweidingen over snelheidsgrafieken of *Collapse Transformations*).
  - **Nuchtere, compacte slotzin**: Sluit feedback steeds af met één korte, nuchtere slotzin passend bij het prestatieniveau zonder overdreven lof of uitroeptekens (bv. *"Verder is dit een goed vertrekpunt."*, *"Verder technisch en vormelijk sterk gewerkt."*).
- **Sentence Case**: Use sentence case for headings (only capitalize first word and proper nouns; capitalizing the first word after a colon is permitted, e.g. `### CSS: Vormgeving`).
- **Afbeeldingen & Grids**: Gebruik van `{{< grid >}}` shortcode (of custom gap) om afbeeldingen naast elkaar te plaatsen is niet nodig. Door markdown afbeeldingen direct onder elkaar te plaatsen (zonder witregel ertussen) komen ze in één `<p>` en zorgt de CSS (`p:has(> img:nth-of-type(2))`) automatisch voor een flexbox layout met gelijke kolommen en standaard `1rem` gap.
- **Lesplanning (`planning.md`)**: Hanteer een strakke, zakelijke, telegrafische didactische fiche-stijl voor de leerkracht (geen wollige handleidingstekst, geen langdradige leerlinginstructies, en geen open deuren zoals *"individuele coaching"* of *"klassikaal de theorie doornemen"*). Begin het document direct met de eerste leskop `## Les 1 DD/MM/YYYY ([Vak], [Starttijd] - [Eindtijd])` (zonder `# Planning:...` hoofdtitel of metadata-regels over lokaal/duurtijd; de paginatitel en vakcontext worden door de Hugo-layout gegenereerd). Formatteer leskoppen zonder lesurenaantal zoals "2x" voor het vak. Plaats de titel van de lesfiche direct als subkop (`### [Opdrachtnaam]: [Focus]`) zonder tussenkopje of blockquote voor een heldere TOC. Plaats `### Lesverloop & inhoud` altijd vòòr `### Leerplandoelen`. Gebruik geen emoji's in koppen (`## Les X`, `### Lesverloop & inhoud`, `### Leerplandoelen`) en hanteer een gewone hyphen (` - `) voor lesuren en tijdspannes. Splits het lesverloop op in afzonderlijke didactische kernstappen (`1.` t.e.m. `5.`) met enkelvoudige, beknopte koppen (belangrijke leermomenten zoals een toets of klassikale demo krijgen een eigen genummerde stap; administratieve afronding hoort als sub-bullet onder de laatste stap) en maximaal één niveau aan vlakke sub-bullets (`1. -> *`, geen sub-sub-bullets). Formuleer handelingen resultaatgericht zonder softwaremechanica of tool-uitleg tussen haakjes, respecteer de natuurlijke ontwerpfases (eerst inhoudelijke en structurele opbouw, daarna sfeer/toonwaarden/kleurafstemming) en stem bestandsnamen letterlijk af op de projectstructuur.
- **Mappenstructuur & Oplevering**: Gebruik in codeblokken voor mappen- en archiefstructuren consequent het uniforme boomteken `└─` (in plaats van wisselende `├──` en `└──`). Toon bij `## Oplevering` direct een codeblock van het gezipte bestand of de voorziene Smartschool-uploadmappen met de vereiste bestandsstructuur in plaats van een abstracte callout, met direct daaronder de kwaliteitscontrole genest als `### Checklist` (met `####`-subchecks).
- **CSS & Vormgeving (Geen Utility Classes)**: Vermijd overbodige utility-classes, inline styling of BEM-klassen in HTML/templates (geen overmatige wrappers zoals `.sc-main-header`). Styling gebeurt via de natuurlijke logica en semantiek van CSS: elementselectors, structurele pseudo-classes (`:has()`, `:first-child`, `:nth-child()`), attribuutselectors, en bestaande site-tokens/CSS-variabelen (`var(--margin-top)`, `var(--margin-bottom)`, `var(--fgcolor)`, `var(--bgcolor)`, etc.) in plaats van ad-hoc classes.
- **Puntenverdeling, Inleverafspraken, Mappen & Deadlines**: Voorzie bij elke evaluatie/indiening (`indieningen` of `leerplandoelen` in frontmatter) altijd afzonderlijke, objectieve succescriteria om zowel **mappenstructuur & bestandsnaamgeving** als **tijdig indienen / inleverafspraken** te kunnen beoordelen:
  - **Mappenstructuur & Bestandsnaamgeving**: Gebruik bij finale opleveringen van het projectpakket steeds `CRS27` (4.4 Release & presentatie: conform mappenstructuur en naamconventie opleveren) en bij voorbereidende/tussentijdse processtappen `CRS01` (4.1 Analyse & workflow: specificaties, naamgeving en OneDrive-mapstructuur toepassen).
  - **Tijdigheid, Planning & Inleverafspraken**: Kies hiervoor bij voorkeur een doel uit een cluster die nog niet actief is in die indiening of opdracht (bij voorkeur `GEC01` of `CRS04` uit 4.6 Professionele competenties, of `CRS03` uit 4.1, `CRS27` uit 4.4, of `13.04`/`13.05` uit 4.5). De formulering met de term **"inleverafspraken"** (bv. in `GEC01`: *"De tussentijdse/finale deadline en inleverafspraken van de opdracht stipt naleven"*) is de standaard om deadlines, uploadprocedures en correcte indiening overkoepelend te kunnen quoteren. Vermeld nooit effectieve deadline-data of -tijdstippen (bv. `(12/11, 10u00)`) in een `criterium:` — die horen uitsluitend in het `deadline:`-veld.
- **Minimaal Twee Succescriteria per Cluster**: Elke actieve cluster binnen een rubriek of indiening (`indieningen` in frontmatter en `rubriek-*.json`) moet **altijd minimaal twee succescriteria** bevatten (clusters die niet van toepassing zijn mogen uiteraard leeg blijven). Eén enkel criterium per cluster zorgt voor te grove niveaustappen (0, 33%, 66%, 100%); minimaal twee succescriteria per actief cluster zorgen voor een veel handigere, evenwichtigere en genuanceerdere puntenverdeling.



# Git Commit Message Conventions

* Never commit and push without explicit approval.
* **Keep `README.md` Minimal & Public-Safe:** `README.md` is a public GitHub landing page and must stay brief and neutral. Never document internal teacher workflows, assignment/planning templates, grading pipelines, `overzicht/` tools, `planning.md`, colleague names, or `AGENTS.md` references in `README.md`; all internal documentation belongs in `AGENTS.md`.
* **Pre-Commit Documentation Check (`AGENTS.md` & `README.md`):** Whenever asked to write a commit message (e.g. *"schrijf commit msg"*), **always** inspect the full diff and untracked files first to verify whether `AGENTS.md` (new features, layouts, shortcodes, directory structure, tooling, templates, conventions, or evaluation patterns) — or in rare cases `README.md` (only high-level public build/deployment changes) — needs to be updated. Apply any necessary updates directly **before** finalizing the commit message (so they are included in the commit breakdown), and always state explicitly in your reply whether `AGENTS.md` and `README.md` were updated or why no update was needed.
* Write a clear commit message. Check the diff and the last 20 commit messages for inspiration. Use the Conventional Commits style.
* **Style:** Always follow the **Conventional Commits** standard.
* **File Breakdown in Commit Body:** Always group bullet points by file or component path in the commit body, explicitly listing what specific changes were made per file, matching the established repository history. Never use leading dashes or colons for the file/component path header. Follow this exact template:

```text
<type>(<scope>): <short description in imperative present tense>

path/to/file1.ext
* Specific change description in sentence case.
* Another change description.

path/to/file2.ext, path/to/file3.ext
* Change description for grouped files.
```

# Internal Project Reference & Templates

## Vakken, periodes & thema's (2026-2027)

### Vakken & titularissen
* **Motion (4u):** Vincent Vander Cruyssen *(5CRM & 6CRM)*
* **Webdesign en storytelling (3u):** Vincent Vander Cruyssen *(5CRM & 6CRM)*
* **Beeldanalyse en -bewerking (2u):** Vincent Vander Cruyssen *(5CRM & 6CRM)*
* **Grafische vormgeving (4u):** Emelie Van de Peer *(5CRM)* & Birthe Fockaert *(6CRM)*

### Jaarplanning: Periodes & thema's
Elk leerjaar kent vier vaste afgebakende periodes en projectthema's, aangevuld met optionele/vrije opdrachten (`thema: "Vrij"` of `thema: ""`):

* **5CRM (Leerjaar 5):**
  1. **September:** `Introductie`
  2. **Oktober:** `Kinetische kunst`
  3. **November–Januari:** `Water (Jeugdboekenmaand)`
  4. **Januari–Mei:** `Kunstcollab`
* **6CRM (Leerjaar 6):**
  1. **September:** `Herhaling`
  2. **Oktober–December:** `Zwaartekracht (Poëzieweek)`
  3. **Januari–Maart:** `Fashion`
  4. **April–Mei:** `Naar klant`

### Klasafspraken
* We tonen respect en begrip voor ieders eigenheid
* We gebruiken altijd en tegen iedereen gepaste taal
* We tonen geen grensoverschrijdend gedrag, fysieke of verbale agressie
* We dragen zorg voor het schoolgebouw en de omgeving
* We zijn steeds tijdig aanwezig op de afgesproken plaats
* We hebben steeds al ons materiaal bij
* We nemen een positieve werkhouding aan in de klas

## Projectstructuur & Hugo-architectuur

```text
archetypes/
└─ opdracht/index.md          # Archetype met periodes/thema's en succescriteria-indeling
content/
└─ 2026-2027/
   └─ 5crm/                   # beeld/, grafische/, motion/, web-story/
   └─ 6crm/                   # beeld/, grafische/, motion/, web-story/
└─ cursus/
   └─ after_effects/          # Cursus Adobe After Effects (8 hoofdstukken + cheat sheet, img/, oefenbestanden/)
   └─ blender.md
   └─ css/                    # Cursus CSS (declaraties, boxmodel, kleuren, typografie, flexbox & grid)
   └─ fotografie/             # Cursus Fotografie & beeldanalyse (Kathleen Michiels & Vincent Vander Cruyssen)
   └─ html/                   # Cursus HTML (bouwstenen, tags, werkomgeving, structuur & formulieren)
└─ doelen/
   └─ _index.md               # Verzamelpagina doelstellingen
   └─ crossmedia.md           # 53 Crossmedia leerplandoelen & evaluatieclusters
└─ overzicht/                 # Enkel lokaal (development): jaarplanning, thema- en presentatie-overzichten
data/
└─ clusters.yaml              # 6 Evaluatieclusters in volgorde van CRM sjabloon opdracht.docx
└─ leerplandoelen.yaml        # Centrale dataset met alle 53 doelstellingen, codes en clusters
└─ jaarplanning-*.json        # Bewerkbare weekplanningen per klas (5CRM & 6CRM)
└─ presentatie-*.json         # Opgeslagen presentatie-evaluaties per thema
└─ rubriek-*.json             # Opgeslagen rubriek- en cijferevaluaties per opdracht
```

### Opdrachten als Page Bundles & lesplanning (`planning.md`)
Opdrachten zijn Leaf Bundles onder `content/2026-2027/{klas}/{vak}/{opdracht-slug}/` met `img/`, `index.md` en optioneel `planning.md`.

* **Paginatitels (`<title>`):** `Opdracht | Avant [Klas] [Vak]` en `Opdracht (Planning) | Avant [Klas] [Vak]`.
* **Titel- & themahiërarchie:** Hoofding toont `Klas - Vaknaam` (verkort in sidebar header) en `Thema: Opdrachtnaam` (of enkel `Opdrachtnaam` als `thema: ""` leeg is).
* **Smartschool lesplanning (`planning.md`):** Hugo genereert automatisch `.../planning.html` via een Custom Output Format (bereikbaar via de homepage, afgeschermd op de leerlingpagina) met semantische TOC en scrollspy.
* **Evaluatieclusters & puntenverdeling:** Doelen worden automatisch gegroepeerd via `data/leerplandoelen.yaml` en `data/clusters.yaml`. Naast `indieningen:` ondersteunt `leerplandoelen:` op hoofdniveau (voor enkelvoudige opdrachten) zowel objecten (`code`, `gewicht`, `criterium`) als losse codes (bv. `"CRS21"`). Hugo genereert per opdracht een `puntenverdeling.html` en rubriekweergave (Niveau 0–3).

### Render hooks, afbeeldingen & shortcodes
* **Image Render Hook (`layouts/_default/_markup/render-image.html`):** Converteert PNG/JPG naar WebP met responsive `srcset` (`480w`, `768w`, `1080w`, `1440w`, `1920w`); SVG en geanimeerde GIF blijven intact. Ondersteunt query-parameters (`?width=450px`, `?w=60%`) en hashtags (`#small` 380px, `#medium` 600px, `#half`/`#50%`, `#third`/`#33%`, `#center`).
* **Link Render Hook (`layouts/_default/_markup/render-link.html`):** Koppelt root-relatieve links (`/`) via `relURL` aan `baseURL` (`/avant/`), opent externe en interne paginalinks in een nieuw tabblad (`target="_blank"` + `rel="noopener noreferrer"`), houdt `#`-ankers binnen dezelfde pagina en laat relatieve downloadlinks intact.
* **Automatische afbeeldingskolommen:** Twee of meer afbeeldingen direct onder elkaar (zonder witregel) worden automatisch naast elkaar gezet (gelijke kolommen, of onevenredig met bv. `?w=30%` / `#third`; op ≤ 600px verticaal gestapeld).
* **Shortcodes:**
  * `{{< grid cols=2 gap="1rem" >}}...{{< /grid >}}` (`layouts/shortcodes/grid.html`) — gemengde content naast elkaar.
  * `{{< pinboard url="..." >}}` (`layouts/shortcodes/pinboard.html`) — interactief Pinterest-bord.
  * `{{< video src="img/video.mp4" width="360" >}}` (`layouts/shortcodes/video.html`) — responsive video.
  * `{{< demo_embed dir="voorbeelden/..." title="..." height="650px" >}}` (`layouts/shortcodes/demo_embed.html`) — live HTML/CSS preview met syntax-highlighted code panels, tabs en fullscreen.
* **Aanbevolen stockplatformen voor opdrachten:** [Pexels](https://www.pexels.com/) en [Unsplash](https://unsplash.com/).
* **TOC, typografie & auteurscredit:** H2–H4 TOC met inklapbare H4's, scrollspy (`main.js`) en CSS-counters; lokale **Aptos** / **Aptos Mono** fonts in `static/fonts/` ([Microsoft Aptos Fonts](https://www.microsoft.com/en-us/download/details.aspx?id=106087)); verticale auteursbadge (`body::after`) op basis van `auteurs:` in frontmatter.

### Lokaal ontwikkelen, grading pipeline & leerkrachtoverzichten
* **Dev server (`npm run dev`):** Start Hugo (poort 1313), lokale Save Server (poort 1315, `scripts/save_server.js`) en live asset-spiegeling (`scripts/dev.js`: `assets/js/rubriek.js` en `assets/css/grading.css` → `static/`).
* **Evaluatiemodi (Rubriek vs. Cijfer):** Het beoordelingspaneel ondersteunt zowel criteria-gebaseerde rubrieken (Niveau 0–3) als rechtstreekse puntinvoer per cluster (automatisch bij type `cijfer` of toetsen, of via de `useRubrics`-toggle in de actiebalk).
* **Lokale leerkrachtoverzichten (`content/overzicht/`):** Enkel zichtbaar in `hugo.Environment == "development"` via zijbalk en startpagina (uitgesloten van reguliere opdrachtenlijsten):
  * **Jaarplanning (`layout: "jaarplanning"`):** Bewerkbare weektabel voor 5CRM en 6CRM (`content/overzicht/5crm-jaarplanning.md`, `6crm-jaarplanning.md`) met live woord-/tekenteller, trimesterfilters, kolomselectie (Motion, Web+Story, Beeld + optionele referentiekolommen), auto-save naar `data/jaarplanning-*.json` via poort 1315, klembord-export (Word/Excel/Smartschool), CSV-download en A4-afdrukweergave.
  * **Thema- & presentatie-overzichten (`layout: "thema-overzicht"`, `layout: "presentatie-evaluatie"`):** Aggregeren rubriekscores en feedback per leerling over vakken heen binnen een thema en ondersteunen presentatie-evaluaties met opslag in `data/presentatie-*.json`.

## Sjabloon voor nieuwe opdrachten (`index.md`)

````markdown
---
title: "Kernwoord"
date: 2026-11-16
schooljaar: "2026-2027"
klas: "6CRM"
vak: "motion"
auteurs:
  - "Vincent Vander Cruyssen"
periode: "November - Januari"
thema: "Themanaam"
software:
  - "Software 1"
  - "Software 2"
indieningen:
  - id: "onderzoek"
    titel: "Kernwoord 1.1 Onderzoek en ontwerpplan"
    deadline: 2026-12-15
    lesuren: 2
    gewicht: 4
    leerplandoelen:
      - code: "13.01"
        gewicht: 1
        criterium: "Minimaal vijf inspirerende voorbeelden doelgericht verzamelen en analyseren."
      - code: "CRS01"
        gewicht: 1
        criterium: "De productievereisten en bestandsnaamgeving correct toepassen in VoornaamA_Kernwoord-Onderzoek.pdf."
      - code: "CRS02"
        gewicht: 1
        criterium: "Doelgericht passende technieken en werkmethodes selecteren in functie van het beoogde resultaat."
      - code: "CRS24"
        gewicht: 1
        criterium: "Een overzichtelijke compositieschets of wireframe uittekenen als basis voor de uitwerking."
      - code: "CRS04"
        gewicht: 1
        criterium: "Het onderzoeksdocument en verzamelde bronnen ordelijk beheren in de OneDrive-vakmap."
      - code: "GEC01"
        gewicht: 1
        criterium: "De tussentijdse deadline en inleverafspraken voor het onderzoek stipt naleven."

  - id: "oplevering"
    titel: "Kernwoord 2.1 Oplevering"
    deadline: 2027-01-12
    lesuren: 4
    gewicht: 12
    leerplandoelen:
      - code: "CRS06"
        gewicht: 1
        criterium: "Vlot en zelfstandig werken met de gekozen software en gereedschappen."
      - code: "CRS16"
        gewicht: 2
        criterium: "Een kwalitatief eindproduct realiseren dat inhoudelijk en technisch aansluit bij het onderzoek."
      - code: "CRS22"
        gewicht: 1
        criterium: "Beeld, typografie, kleur en timing esthetisch op elkaar afstemmen tot één samenhangend geheel."
      - code: "CRS20"
        gewicht: 1
        criterium: "Werkbestanden, assets en exports ordelijk bundelen in de projectmap."
      - code: "CRS27"
        gewicht: 1
        criterium: "Het volledige projectarchief VoornaamA_Kernwoord.zip conform de mappenstructuur en naamconventie opleveren."
      - code: "CRS23"
        gewicht: 1
        criterium: "Het eindresultaat kritisch controleren op technische specificaties, scherpte en bestandsgrootte."
      - code: "GEC02"
        gewicht: 1
        criterium: "Kwaliteitsbewust handelen door oog voor detail en propere afwerking."
      - code: "CRS04"
        gewicht: 1
        criterium: "Werkbestanden en assets overzichtelijk ordenen in de OneDrive-vakmap."
      - code: "GEC01"
        gewicht: 1
        criterium: "De finale deadline en alle inleverafspraken stipt naleven."
draft: false
---

## Briefing & concept

Wervende introductie waarin je de opdracht linkt aan de praktijk, het werkveld of het overkoepelende thema. Leg uit wat je gaat maken en wat de kernvereisten zijn:

* **Onderdeel 1**: Korte omschrijving van het hoofdelement en formaat.
* **Onderdeel 2**: Korte omschrijving van de technische of visuele lijn.

![Hero animatie of sfeerbeeld](img/hero.png?w=50%)

{{< pinboard url="https://www.pinterest.com/gebruikersnaam/naam_board/" >}}

## Onderzoek

Verken vooraf hoe ontwerpers dit thema of deze techniek aanpakken en bereid je eigen keuzes voor.

Zoektermen: `relevante zoekterm 1, relevante zoekterm 2, relevante zoekterm 3`.

### Inspiratie & ontwerpplan

Bundel je vijf voorbeelden en je voorbereiding in `VoornaamA_Kernwoord-Onderzoek.pdf`:

1. **Inspiratieanalyse**: Verzamel minimaal vijf kwalitatieve voorbeelden en noteer per voorbeeld beknopt wat opvalt qua techniek, opbouw, ritme of sfeer.
2. **Eigen keuzes**: Motiveer welke technieken, kleuren en vormen je kiest in functie van jouw concept en doelgroep.
3. **Schets / opbouw**: Teken een snelle compositieschets of wireframe waarin de belangrijkste onderdelen en verhoudingen duidelijk zijn aangeduid.

Plaats het document in `01_onderzoek/` en dien in via Smartschool.

## Opdracht

Werk je ontwerp stelselmatig uit volgens de technische en inhoudelijke afspraken.

### Voorbereiding & opzet

1. Stel je document of projectmap in volgens de vereiste specificaties (**formaat / resolutie**, **framerate / kleurmodus**).
2. Verzamel en orden je bronmateriaal (eigen opnames, vectorbestanden of rechtenvrij materiaal via [Pexels](https://www.pexels.com/) of [Unsplash](https://unsplash.com/)) lokaal in je assetmap.

### Productie & afwerking

1. Werk de hoofdonderdelen stap voor stap en niet-destructief uit.
2. Gebruik het gereedschap **Naam gereedschap** (*Engelse toolnaam*, sneltoets `T`) voor specifieke bewerkingen.

> **Belangrijke tip of valkuil!**  
> Plaats hier een gerichte didactische waarschuwing of toelichting (bv. over niet-destructief werken, relatieve paden of schone laagopbouw).

### Export

Exporteer het eindresultaat volgens de gevraagde instellingen (**formaat**, **compressie**, **maximale bestandsgrootte**).

### Extra's

Voor wie sneller klaar is of extra diepte wil toevoegen:
* **Optie A:** Beschrijving van een gevorderde techniek of visuele verfijning.
* **Optie B:** Extra detail in typografie, interactie of geluid.

## Oplevering

Lever jouw volledige project in als één ZIP-archief via de Smartschool Uploadzone:

```text
VoornaamA_Kernwoord.zip
└─ VoornaamA_Kernwoord/
   └─ 01_onderzoek/
      └─ VoornaamA_Kernwoord-Onderzoek.pdf
   └─ 02_assets/
      └─ [alle gebruikte bronbestanden]
   └─ 03_exports/
      └─ VoornaamA_Kernwoord.mp4
   └─ VoornaamA_Kernwoord.aep
```

### Checklist

#### Bestandsbeheer & structuur
* Het ZIP-archief draagt de naam `VoornaamA_Kernwoord.zip`.
* Het onderzoeksdocument met schets zit in `01_onderzoek/`.
* Alle gebruikte assets zitten lokaal in `02_assets/` zodat het werkbestand zonder ontbrekende bestanden opent.

#### Vormgeving & techniek
* Formaat, verhouding en kleurmodus zijn correct ingesteld.
* Niet-destructieve werkmethodes en een nette lagen- of codestructuur zijn consequent toegepast.

#### Exportkwaliteit
* Het eindbestand in `03_exports/` voldoet aan alle gevraagde exportinstellingen en vormt een verzorgd geheel.
````

## Sjabloon voor lesplanning (`planning.md`)

```markdown
## Les 1 [DD/MM/YYYY] ([Vak], [Starttijd] - [Eindtijd])

### [Opdrachtnaam]: [Onderwerp & Focus]

### Lesverloop & inhoud
1. **[Beknopte stapnaam]:**
   * [Doelgerichte handeling of taak].
   * [Technisch bouwplan of concrete afspraak].
2. **[Volgende didactische stap]:**
   * [Toelichting software, editor of methode].
   * [Mappenstructuur en naamconventies].
3. **[Theorie / Cursusonderdeel]:**
   * **[Kernbegrip 1]:** [Beknopte focus].
   * **[Kernbegrip 2]:** [Beknopte focus].
4. **[Evaluatie / Toets]:**
   * **Vraagformaat:** [Type vragen, bv. meerkeuzevragen gecombineerd met invulvragen].
   * **Leerbronnen:** [Verwijzing naar planner, cursus en opdrachten].
5. **[Praktische realisatie]:**
   * **[Deeltaak 1]:** [Actie met concrete tools of bestanden].
   * **[Deeltaak 2]:** [Actie met styling, animatie of exports].

### Leerplandoelen
* **[Code]:** [Succescriterium in concrete leerkracht-/leerlingentaal]
```