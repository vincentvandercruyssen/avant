# Avant — Crossmedia (CRM)

Lesmateriaal, opdrachten en cursussen voor de richting **Crossmedia (5CRM & 6CRM)** aan school **Avant**.

## 🚀 Overzicht

Deze Hugo-site fungeert als intern werkdashboard en opdrachtgenerator voor leerkrachten en leerlingen binnen het domein *Kunst & Creatie (Dubbele Finaliteit)*.

### 📚 Vakken & Titularissen (2026-2027)

- **Motion (4u):** Vincent Vander Cruyssen *(5CRM & 6CRM)*
- **Webdesign en storytelling (3u):** Vincent Vander Cruyssen *(5CRM & 6CRM)*
- **Beeldanalyse en -bewerking (2u):** Vincent Vander Cruyssen *(5CRM & 6CRM)*
- **Grafische vormgeving (4u):** Emelie Van de Peer *(5CRM)* & Birthe Fockaert *(6CRM)*

### 🗓️ Jaarplanning: Periodes & Thema's (2026-2027)

Elk leerjaar kent 4 vaste afgebakende periodes en projectthema's, aangevuld met optionele/vrije opdrachten:

#### 5CRM (Leerjaar 5)
1. **September:** `Introductie`
2. **Oktober:** `Kinetische kunst`
3. **November–Januari:** `Zwaartekracht (Poëzieweek)`
4. **Januari–Mei:** `Kunstcollab`
* **Vrije opdrachten:** `thema: "Vrij"` of leeg laten (`thema: ""`)

#### 6CRM (Leerjaar 6)
1. **September:** `Herhaling`
2. **Oktober–December:** `Event`
3. **Januari–Maart:** `Fashion`
4. **April–Mei:** `Naar klant`
* **Vrije opdrachten:** `thema: "Vrij"` of leeg laten (`thema: ""`)

### 🤝 Klasafspraken

- We tonen respect en begrip voor ieders eigenheid
- We gebruiken altijd en tegen iedereen gepaste taal
- We tonen geen grensoverschrijdend gedrag, fysieke of verbale agressie
- We dragen zorg voor het schoolgebouw en de omgeving
- We zijn steeds tijdig aanwezig op de afgesproken plaats
- We hebben steeds al ons materiaal bij
- We nemen een positieve werkhouding aan in de klas

---

## 📂 Structuur

```
├── archetypes/
│   └── opdracht/index.md      # Archetype met periodes/thema's en succescriteria-indeling
├── content/
│   ├── 2026-2027/
│   │   ├── 5crm/
│   │   │   ├── beeld/
│   │   │   ├── grafische/
│   │   │   ├── motion/
│   │   │   └── web/
│   │   └── 6crm/
│   │       ├── beeld/
│   │       ├── grafische/
│   │       ├── motion/
│   │       └── web/
│   ├── cursus/
│   │   ├── after_effects/
│   │   │   ├── img/           # 62 geëxtraheerde schermafbeeldingen en illustraties
│   │   │   ├── oefenbestanden/# Downloadbare Illustrator oefenbestanden (.ai)
│   │   │   └── index.md       # Cursus Adobe After Effects (8 hoofdstukken + cheat sheet)
│   │   ├── blender.md
│   │   ├── css/
│   │   │   ├── img/           # 19 illustraties, diagrammen en video-opnames
│   │   │   └── index.md       # Cursus CSS (declaraties, boxmodel, kleuren, typografie, flexbox & grid)
│   │   ├── fotografie/
│   │   │   ├── img/           # 162 geëxtraheerde illustraties, diagrammen en voorbeelden
│   │   │   └── index.md       # Cursus Fotografie & beeldanalyse (Kathleen Michiels & Vincent Vander Cruyssen)
│   │   └── html/
│   │       ├── img/           # Schermafbeeldingen browser rendering
│   │       └── index.md       # Cursus HTML (bouwstenen, tags, structuur & formulieren)
│   └── doelen/
│       ├── _index.md          # Verzamelpagina doelstellingen
│       └── crossmedia.md      # 53 Crossmedia leerplandoelen & evaluatieclusters
├── data/
│   ├── clusters.yaml          # 6 Evaluatieclusters in volgorde van CRM sjabloon opdracht.docx
│   └── leerplandoelen.yaml    # Centrale dataset met alle 53 doelstellingen, codes en clusters
```

### 📄 Opdrachten als Page Bundles & Mappenstructuur
Opdrachten worden ingericht als modulaire Leaf Bundles (`content/2026-2027/{klas}/{vak}/{opdracht-slug}/`):

```text
{opdracht-slug}/
├── img/               # Alle afbeeldingen, illustraties en animaties (PNG, JPG, SVG, GIF)
├── index.md           # Opdrachtdocumentatie voor leerlingen
└── planning.md        # (Optioneel) Smartschool-lesplanning en fiches voor leerkrachten
```

- **Titelconventie (1 kernwoord):** Gebruik bij voorkeur **één beknopte, krachtige naam** (bv. `title: "Kijkkader"`, `title: "Vormen"`, `title: "Profiel"`, `title: "Parallax"`, `title: "Paspoort"`, `title: "Bauhaus"`, `title: "Lookbook"`). Dit houdt de weergave in de sidebar, navigatie en dashboards strak en overzichtelijk.
- **Datumconventie:** Gebruik uitsluitend het formaat `YYYY-MM-DD` (bv. `date: 2026-09-01`).
- **Paginatitels (`<title>`):**
  - Opdrachten: `Opdracht | Avant [Klas] [Vak]` (bv. `Parallax | Avant 6CRM Motion`).
  - Planning: `Opdracht (Planning) | Avant [Klas] [Vak]` (bv. `Parallax (Planning) | Avant 6CRM Motion`).
- **Titel- & Themahiërarchie:** De hoofding toont `Klas - Vaknaam` (met verkorte vaknaam in de sidebar header) en daaronder `Thema: Opdrachtnaam` (of enkel `Opdrachtnaam` indien `thema: ""` leeg is).
- **Geen horizontale scheidingslijnen (`---` / `<hr>`):** Gebruik **geen `---`** in de Markdown-body van opdrachten of planningen. De visuele structuur en rust worden volledig gedragen door semantische koppen (`##`, `###`, `####`), witruimte, callouts en de automatische CSS-lay-out.
- **Didactische toon & Aanspreekvorm (geen "we"):** Schrijf opdrachten in een directe, activerende stijl gericht naar de individuele leerling (**je / jij / jouw** of actieve imperatief: *"Open de browser"*, *"Onderzoek de broncode"*, *"Voor je start..."*). Vermijd meervoudsvormen zoals *"we"*, *"wij"*, *"ons"* of *"laten we"*.
- **Homepagina:** Opdrachten worden gerangschikt per schooljaar, vak en klas met directe links naar de opdracht en (indien aanwezig) de bijhorende lesplanning.

### 📅 Smartschool Lesplanning (`planning.md`)
Voor elke opdracht kan een optionele `planning.md` worden toegevoegd:
- **Aparte pagina via Custom Output Format:** Hugo genereert automatisch `.../planning.html` (bereikbaar via de link onder de opdracht op de homepage).
- **Afgeschermd voor leerlingen:** De planning-knop verschijnt niet op de leerlingpagina van de opdracht zelf.
- **Automatische TOC (Lessen & Lesfiches):** De zijbalk genereert automatisch ankernavigatie voor zowel de lessen (`## 📅 Les X ...`) als de interne onderdelen (`### 📌 Titel lesfiche`, `### 🎯 Leerplandoelen`, `### 📋 Lesverloop & inhoud`).
- **Titel lesfiche:** Plaats onder `### 📌 Titel lesfiche` de titel van de lesfiche conform Smartschool volgens het vaste patroon `> **[Opdrachtnaam]: [Kernonderwerpen & Focus]**` (bv. `> **Paspoort: Wireframe, Cursus HTML & Uitwerking HTML & CSS**`, `> **Kijkkader: Introductie Beeldtaal, Compositieregels & Praktijkshoot op Locatie**` of `> **Parallax: Kennismaking & Briefing**`).
- **Lesverloop & inhoud (maatstaf voor didactische fiches):**
  - **Telegrafisch & zakelijk (geen handleiding):** Schrijf als een strak didactisch draaiboek voor de leerkracht. Vermijd wollige volzinnen, langdradige leerlinginstructies en open deuren (*geen "individuele coaching & opvolging"*, *geen "klassikaal de theorie doornemen"*).
  - **Afzonderlijke didactische kernstappen:** Splits het lesverloop op in genummerde stappen (`1.` t.e.m. `5.`). Belangrijke leermomenten zoals een toets, theorie-ontleding of klassikale demonstratie krijgen altijd een eigen genummerde stap en worden niet weggemoffeld als sub-item.
  - **Eenvoudige nesting (maximaal 1 subniveau):** Onder een genummerde stap gebruik je uitsluitend een vlakke lijst met bullet points (`1. -> *`). Gebruik **geen sub-sub-bullets** (`* -> *`).
  - **Beknopte, functionele benamingen:** Gebruik heldere termen (bv. *Wireframe met aanduidingen HTML-tags*, *Ontleding HTML-document*, *Toets aankondigen*, *Kleine toets HTML*, *Uitwerken Paspoort (HTML & CSS)*).

### 🖼️ Automatische WebP Image Processing & Responsive Beelden
Alle Markdown-afbeeldingen in `img/` worden via een **Image Render Hook** ([`render-image.html`](layouts/_default/_markup/render-image.html)) automatisch geoptimaliseerd:
- **WebP & Responsive `srcset`:** Converteert PNG/JPG automatisch naar WebP met breakpoints voor smartphone (`480w`, `768w`), 15" laptop (`1080w`, `1440w`) en 27" desktop (`1920w`).
- **Vector- & animatiebestanden:** SVG- en geanimeerde GIF-bestanden worden zonder kwaliteitsverlies doorgelust (niet geconverteerd naar WebP), met volledige ondersteuning voor custom breedtes en centrering.
- **Formaat- & Stijlparameters in Markdown:**
  - **Query parameters:** `![Alt](img/foto.png?width=450px)` of `![Alt](img/foto.png?w=60%)`
  - **Snelle hashtags:**
    - `#small` (380px breed)
    - `#medium` (600px breed)
    - `#half` of `#50%` (50% kolombreedte)
    - `#third` of `#33%` (33.3% kolombreedte)
    - `#center` (gecentreerd uitlijnen, bv. `![Alt](img/foto.png#half#center)`)

### 🔗 Link Render Hook & URL-Resolutie
Alle Markdown-links worden verwerkt via een **Link Render Hook** ([`render-link.html`](layouts/_default/_markup/render-link.html)):
- **Root-relatieve links (`/`):** Links die starten met een slash (bv. `[Cursus Fotografie](/cursus/fotografie/)` of `[Kijkkader](/2026-2027/5crm/beeld/kijkkader/#concept--thema)`) worden via `relURL` automatisch gekoppeld aan het `baseURL`-subpad (`/avant/`). Hierdoor werken links foutloos, zowel lokaal (`http://localhost:1313/avant/...`) als online op GitHub Pages (`https://vincentvandercruyssen.github.io/avant/...`).
- **Nieuw tabblad (`target="_blank"`):** Externe links en interne pagina-/cursusverwijzingen openen standaard in een nieuw tabblad met `rel="noopener noreferrer"`, zodat leerlingen de actieve opdracht niet verliezen.
- **In-page ankers (`#`):** Interne ankerverwijzingen binnen dezelfde pagina (startend met `#`, bv. `[Stap 1](#stap-1)`) navigeren direct binnen dezelfde pagina (zonder `target="_blank"`).
- **Relatieve downloadlinks:** Lokale bronnen binnen page bundles (zoals `[Voorbeeld](oefenbestanden/bestand.ai)`) behouden hun relatieve pad intact.

### 📐 Automatische Afbeeldingskolommen & Flex-lay-out
- **Gelijke kolommen (Pure Markdown):** Plaats 2 of meer afbeeldingen direct onder elkaar zonder witregel. De CSS groepeert ze automatisch in gelijke kolommen (50/50 bij 2 beelden, 33/33/33 bij 3 beelden):
  ```markdown
  ![Voorgrond](voorgrond.png)
  ![Achtergrond](achtergrond.png)
  ```
- **Onevenredige kolommen:** Geef één van de afbeeldingen een breedte mee (bv. `?w=30%` of `#third`). De andere afbeelding vult automatisch de resterende breedte op:
  ```markdown
  ![Groot overzicht](overzicht.png)
  ![Detailknop](knop.png?w=30%)
  ```
- **Responsief:** Op smalle schermen ($\le 600\text{px}$) schakelen multi-image alinea's automatisch over naar een verticale stapeling.
- **Shortcode `{{< grid >}}`:** Voor meer complexe lay-outs of gemengde content (tekst, code, beelden) is er een lichte grid-shortcode ([`grid.html`](layouts/shortcodes/grid.html)):
  ```markdown
  {{< grid cols=2 gap="1rem" >}}
  Linkerkolom content...

  Rechterkolom content...
  {{< /grid >}}
  ```
- **Geen shortcode nodig voor beelden:** Het gebruik van `{{< grid >}}` (of een aangepaste gap) om afbeeldingen naast elkaar te plaatsen is niet nodig. Markdown-afbeeldingen direct onder elkaar plaatsen activeert automatisch de CSS-flexbox met standaard `1rem` gap.
- **Shortcode `{{< pinboard >}}`:** Voor het insluiten van een interactief Pinterest-bord ([`pinboard.html`](layouts/shortcodes/pinboard.html)):
  ```markdown
  {{< pinboard url="https://www.pinterest.com/gebruikersnaam/naam_board/" >}}
  ```
- **Shortcode `{{< video >}}`:** Voor het responsive insluiten van videobestanden binnen page bundles of de assetmap ([`video.html`](layouts/shortcodes/video.html)):
  ```markdown
  {{< video src="img/video.mp4" width="360" >}}
  ```

### 📸 Aanbevolen Stockplatformen (Bronmateriaal)
Voor opdrachten rond beeldbewerking, compositing en motion design gebruiken leerlingen kwalitatief, rechtenvrij beeldmateriaal via:
- [Pexels](https://www.pexels.com/): Gratis rechtenvrije foto's en video's in hoge resolutie.
- [Unsplash](https://unsplash.com/): Uitgebreide bibliotheek met creatieve en artistieke stockfoto's.

### 🎯 Automatische Evaluatieclusters & Succescriteria (Eigen Taal)
Doelen worden centraal beheerd in `data/leerplandoelen.yaml` en `data/clusters.yaml`. De clusters worden **volledig automatisch** afgeleid en gerangschikt in de volgorde van het officiële evaluatiesjabloon:
- `leerplandoelen:` ondersteunt zowel losse codes als succescriteria in eigen woorden:
  ```yaml
  leerplandoelen:
    - code: "CRS02"
      criterium: "Zelfstandig een passend belichtingsplan en camera-instellingen selecteren."
    - code: "CRS06"
      criterium: "Professioneel retoucheren in Photoshop met behoud van textuur."
    - "CRS21" # losse code zonder extra velden
  ```
- Het onderdeel **Puntenverdeling** bevat het evaluatieniveau-kader (Niveau 0–3), het vaklabel en de succescriteriatabel en is direct gelinkt in de Table of Contents (TOC).

### 📑 Dynamische Table of Contents (TOC) & Scroll Spy
- **Diepte H2 tot H4:** Hugo genereert de inhoudsopgave van niveau 2 t.e.m. 4 (`[markup.tableOfContents] startLevel = 2, endLevel = 4`).
- **Inklapbare H4-subniveau's:** H4-onderdelen zijn standaard ingeklapt in de zijbalk en worden enkel zichtbaar wanneer het bijhorende H3-hoofdonderdeel actief is of door het scherm passeert.
- **Scroll Spy & Synchronisatie:** Tijdens het scrollen markeert vanilla JavaScript (`main.js`) automatisch de huidige actieve sectie (`.is-active`, `.has-active`) en scrollt het TOC-menu mee indien nodig.
- **Automatische hiërarchische nummering:** Zowel in de broodtekst als in de TOC worden koppen consistent genummerd via CSS counters (`1. `, `1.1 `, `1.1.1 `).

### 🎨 CSS & Styling Filosofie
- **Typografie & Fonts:** De site gebruikt de lettertypefamilie **Aptos** en **Aptos Mono** voor optimale schermleesbaarheid, lokaal geserveerd vanuit `static/fonts/` ([Microsoft Aptos Fonts](https://www.microsoft.com/en-us/download/details.aspx?id=106087)).
- **Dynamische Auteurscredit (`body::after`):** Elke pagina toont rechts verticaal een vaste auteursbadge (`writing-mode: vertical-rl;`). De tekst wordt automatisch samengesteld via `auteurs:` in de frontmatter (waarbij de sitetitel dynamisch voorop staat en voornamen automatisch worden gereduceerd tot hun initiaal, bv. `Avant - I. Doggen, B. Fockaert, V. Vander Cruyssen`).
- **Semantische HTML & CSS Structuur:** We vermijden overbodige utility-classes of BEM-klassen in de HTML (bv. geen `.sc-main-header`).
- **Structurele Selectors:** Styling gebeurt bij voorkeur via de natuurlijke logica van CSS: elementselectors, structurele pseudo-classes (`:first-child`, `:nth-child()`, `:has()`), en attribuutselectors.

---

## ✍️ Stijlgids & Redactie van Opdrachten

Elke opdracht binnen Avant volgt een vaste redactionele en didactische standaard om herkenbaarheid, rust en kwaliteit te waarborgen.

### 1. Titels & Frontmatter
- **Titel (1 kernwoord):** Gebruik bij voorkeur **één beknopt kernwoord** (`title: "Kijkkader"`, `title: "Vormen"`, `title: "Profiel"`, `title: "Parallax"`, `title: "Paspoort"`, `title: "Typografie"`, `title: "Lookbook"`).
- **Auteurs (`auteurs:`):** Noteer de volledige naam van de auteur(s) (bv. `auteurs: ["Vincent Vander Cruyssen"]` of meerdere auteurs bij gedeeld lesmateriaal). De weergavebadge verkort de voornaam automatisch.
- **Software-stack:** Volledige opsomming van gebruikte tools, browsers en standaarden.
- **Succescriteria in eigen taal:** Koppel bij elk leerplandoel een concreet, begrijpelijk succescriterium geformuleerd in leerlingentaal:
  ```yaml
  auteurs:
    - "Vincent Vander Cruyssen"
  leerplandoelen:
    - code: "CRS01"
      criterium: "Productievereisten en bestandsconventies voor webprojecten analyseren en toepassen."
    - code: "CRS06"
      criterium: "Vlot en efficiënt werken met Visual Studio Code en browser-inspectietools."
  ```

### 2. Redactionele & Typografische Regels
- **Aanspreekvorm (geen "we"):** Schrijf opdrachten in een directe, activerende stijl gericht naar de individuele leerling (**je / jij / jouw** of directe imperatief: *"Open de browser"*, *"Selecteer het onderwerp"*, *"Sla het bestand op"*). Vermijd meervoudsvormen zoals *"we"*, *"wij"* of *"laten we"*.
- **Hoofdletters in tussentitels (Sentence case):** Begin in (tussen)titels enkel het eerste woord met een hoofdletter, tenzij het om eigennamen, softwarenamen of tekst na een dubbelpunt gaat (bv. `#### Niet-destructief uitsnijden`, `### CSS: Vormgeving`, `### Onderzoek: Inspectie op Wikipedia`, `#### HTML-basis in VS Code`). Vermijd overbodig Engels *Title Case* waarin elk willekeurig woord met een hoofdletter begint.
- **Softwaretermen & Sneltoetsen:** Vermeld bij softwarefuncties zowel de Nederlandstalige als Engelstalige benaming met sneltoetsen (`Object selecteren (Object Selection Tool, W)`, `Ctrl + T`, `F9 (Easy Ease)`).
- **Getallen en telwoorden (voluit onder de tien):** Schrijf aantallen en telwoorden onder de tien in lopende tekst bij voorkeur voluit in het Nederlands (bv. *"je maakt vier afzonderlijke composities"*, *"kies drie beelden"*, *"de vijf basistransformaties"* in plaats van *"4 composities"* of *"de 5 basistransformaties"*). Technische eenheden, tijden, afmetingen en labels schrijf je wel als cijfer (bv. *"minimaal 5 seconden"*, *"30 fps"*, *"1080 px"*, *"Stap 1"* of *"Compositie 1"*).
- **Beeldvergelijkingen (50/50):** Plaats 2 beelden direct onder elkaar zonder witregel voor een automatische side-by-side flex-kolom. Gebruik breedteparameters (`?w=30%` tot `?w=60%`) voor compacte menuknoppen en detailvensters.
- **Geen redundante fase- of stapnummers in koppen:** Vermijd handmatige nummering zoals `Fase 1:`, `Fase 2:`, `1.`, `2.` of `Stap 1:` in Markdown-koppen (`###`, `####`, `#####`). De Table of Contents en CSS counters nummeren secties automatisch.
- **Geen scheidingslijnen:** Gebruik **geen `---`** in de Markdown-body; de visuele rust en hiërarchie worden gedragen door de koppen (`##`, `###`, `####`), witruimte en callouts.
- **Belangrijke tips & valkuilen:** Plaats cruciale waarschuwingen of didactische aandachtspunten in Markdown callouts (`>`).
- **Vereenvoudigde ASCII-mappenstructuur (`└─`):** Gebruik in codeblokken voor mappen- en archiefstructuren consequent het uniforme boomteken `└─` (in plaats van wisselende `├──` en `└──`). Dit zorgt voor visuele rust en snelle bewerkbaarheid.
- **Meervoudige bestandsnotatie:** Verwijs bij genummerde reeksen beknopt naar opeenvolgende varianten tussen haakjes, bv. `VoornaamA_Opdracht-Comp_1.mp4 (2,3,4)` of `VoornaamA_Opdracht-Storyboard-1.jpg (2,3,4) of .pdf`.

### 3. Vaste Hoofdstukhiërarchie
Elke opdracht volgt een vaste 5-delige structuur:

1. `## Briefing & Concept` — Introductie met praktijkcontext, sfeer-GIF/beeld, kernbegrip/theorie en conceptkeuzes.
2. `## Technische specificaties` (of `## Afspraken`) — Tabel met resoluties, framerates, codecs of bestandsafspraken en de verplichte `VoornaamA_Opdrachtnaam/` mappenstructuur met `└─`.
3. `## Stappenplan` — Modulair en chronologisch opgedeeld per fase (`### Fase`, `#### Substap`):
   - Start bij voorkeur met actief/onderzoekend leren (bv. broncode-inspectie of beeldselectie op Pexels/Unsplash).
   - Gebruik gerichte subkoppen zoals `#### Voorbeeld` (voor de concrete actiestappen los van algemene kaders) en `#### Indienen` (voor tussentijdse evaluaties en uploads).
   - Inclusief een `### Extra's` of `### Extra uitdagingen` voor differentiatie en verdieping.
4. `## Zelfevaluatie & Kwaliteitscontrole` (of `## Checklist`) — Concrete afvinkpunten voor bestanden/mappen, technische eisen en visuele afwerking.
5. `## Oplevering` — Directe instructie gevolgd door een visueel ASCII-codeblok van het `.zip`-bestand met de exacte inhoud (in plaats van een abstracte callout).

---

## 📋 Sjabloon voor Nieuwe Opdrachten (`index.md`)

Onderstaand sjabloon dient als startpunt bij het aanmaken van een nieuwe opdracht:

```markdown
---
title: "Kernwoord"
date: 2026-09-02
schooljaar: "2026-2027"
klas: "6CRM"
vak: "motion"
auteurs:
  - "Vincent Vander Cruyssen"
periode: "September"
thema: "Herhaling"
software:
  - "Software 1"
  - "Software 2"
leerplandoelen:
  - code: "CRS01"
    criterium: "Concreet succescriterium beschreven in begrijpelijke leerlingentaal."
  - code: "CRS02"
    criterium: "Passende technieken en tools doelgericht selecteren in functie van het beoogde resultaat."
draft: false
---

## Briefing & Concept

Wervende introductie waarin je de opdracht linkt aan de praktijk of het werkveld. Leg uit wat de leerling gaat maken en waarom deze techniek belangrijk is.

![Hero animatie of sfeerbeeld](hero.gif?w=50%)

### Wat is [Kernbegrip]?

Beknopte uitleg van de theoretische basis of het onderliggende ontwerpprincipe.

![Voorbeeld voor](voorbeeld-voor.png)
![Voorbeeld na](voorbeeld-na.png)

### Je concept

Geef de leerling duidelijke kaders of keuzemogelijkheden:
1. **Optie 1:** Omschrijving.
2. **Optie 2:** Omschrijving.
3. **Optie 3:** Omschrijving.

## Technische specificaties

| Instelling | Aanbevolen waarde | Toelichting |
| :--- | :--- | :--- |
| **Formaat / Resolutie** | **1080 × 1350 px** | Toelichting bij de keuze van de resolutie/verhouding. |
| **Framerate / Modus** | **30 fps / RGB** | Technische standaard voor scherm of video. |
| **Codec / Container** | **H.264 in MP4** | Universele compatibiliteit. |

### Mappenstructuur

Zet vooraf een ordelijke mappenstructuur op in je OneDrive onder het vak **[Vaknaam]**:

```text
VoornaamA_Opdrachtnaam/
└─ 01_assets/          <- Ruwe bronbestanden, foto's, fonts, audio
└─ 02_werkbestanden/   <- Bewerkbare projectbestanden (.psd, .aep, .ai)
└─ 03_exports/         <- Definitieve opleveringen (.jpg, .mp4)
```

## Stappenplan

### Voorbereiding & Bronmateriaal
* Verzamel kwalitatief bronmateriaal via [Pexels](https://www.pexels.com/) of [Unsplash](https://unsplash.com/).
* Bepaal je compositie en typografische hiërarchie.

### [Eerste fase / Software]

Instructies of technische vereisten van deze fase.

#### Voorbeeld

1. Activeer het gereedschap **Naam gereedschap** (*Engelse toolnaam*, sneltoets `T`).
2. Pas de instellingen aan.

> **Belangrijke tip of valkuil!**  
> Plaats hier een didactische waarschuwing of toelichting (bv. over niet-destructief werken).

### [Tweede fase / Software]

#### Importeren en opzetten
Werkwijze voor het integreren, animeren of stijlen van de onderdelen.

### Extra's

Voor wie sneller klaar is of extra diepte wil toevoegen:
* **Optie A:** Beschrijving van een gevorderde techniek of effect.
* **Optie B:** Verfijning in sound design, micro-interacties of typografie.

## Zelfevaluatie & Kwaliteitscontrole

Controleer je werk grondig aan de hand van onderstaande checklist vóór je definitief inlevert:

### Bestanden & mappen
- De hoofdmap heet exact `VoornaamA_Opdrachtnaam`.
- Alle bestanden staan in de juiste submappen zonder spaties of hoofdletters waar niet toegestaan.

### Technische kwaliteit
- Resolutie, verhouding en kleurmodus/kleurruimte zijn correct ingesteld.
- Niet-destructieve werkmethodes zijn consequent toegepast.

### Vormgeving & Boodschap
- Typografische hiërarchie en leesbaarheid zijn verzorgd.
- Het eindresultaat vormt een evenwichtig en harmonieus geheel.

## Oplevering

Lever de volledige projectmap gecomprimeerd in via de Smartschool Uploadzone.

```text
VoornaamA_Opdrachtnaam.zip
└─ 01_assets/
└─ 02_exports/VoornaamA_Opdrachtnaam-Comp_1.mp4 (2,3,4)
└─ VoornaamA_Opdrachtnaam.aep
└─ VoornaamA_Opdrachtnaam-Storyboard-1.jpg (2,3,4) of .pdf
```
```

---

## 📅 Sjabloon voor Lesplanning (`planning.md`)

Onderstaand sjabloon toont de maatstaf voor een strakke, telegrafische Smartschool-lesfiche:

```markdown
# Smartschool Planning: [Opdrachtnaam] ([Vak])

**Vak:** [Volledige vaknaam] ([Klas])  
**Lokaal:** [Lokaalnummer]  
**Totale duurtijd:** [duurtijd voluit geschreven, bv. drie weken (drie lesuren per woensdag)]  
**Periode:** [Maand Jaar]  

## 📅 Les 1 [DD/MM/YYYY] ([Aantal]x [Vak], [Starttijd] – [Eindtijd])

### 📌 Titel lesfiche
> **[Opdrachtnaam]: [Onderwerp & Focus]**

### 🎯 Leerplandoelen
* **[Code]:** [Succescriterium in concrete leerkracht-/leerlingentaal]

### 📋 Lesverloop & inhoud
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
```

---

## 🛠️ Lokaal ontwikkelen

Vereisten: **Hugo Extended** (zie `.hugo-version`) en **Node.js**.

```bash
# Start de lokale ontwikkelserver (standaard poort 1313)
npm run dev
# of direct via Hugo:
hugo server -p 1313

# Productie build genereren
hugo --gc --minify
```

---

## 🚢 GitHub Pages Deployment

De site wordt automatisch gebouwd en gepubliceerd naar GitHub Pages via GitHub Actions (`.github/workflows/hugo.yaml`) bij elke push naar de `main` branch.
