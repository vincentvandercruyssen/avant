# Avant — Crossmedia (CRM)

Lesmateriaal, opdrachten en cursussen voor de richting **Crossmedia (5CRM & 6CRM)** aan school **Avant**.

## Overzicht

Deze Hugo-site fungeert als intern werkdashboard en opdrachtgenerator voor Avant.

### Vakken & Titularissen (2026-2027)

- **Motion (4u):** Vincent Vander Cruyssen *(5CRM & 6CRM)*
- **Webdesign en storytelling (3u):** Vincent Vander Cruyssen *(5CRM & 6CRM)*
- **Beeldanalyse en -bewerking (2u):** Vincent Vander Cruyssen *(5CRM & 6CRM)*
- **Grafische vormgeving (4u):** Emelie Van de Peer *(5CRM)* & Birthe Fockaert *(6CRM)*

### Jaarplanning: Periodes & Thema's (2026-2027)

Elk leerjaar kent 4 vaste afgebakende periodes en projectthema's, aangevuld met optionele/vrije opdrachten:

#### 5CRM (Leerjaar 5)
1. **September:** `Introductie`
2. **Oktober:** `Kinetische kunst`
3. **November–Januari:** `Water (Jeugdboekenmaand)`
4. **Januari–Mei:** `Kunstcollab`
* **Vrije opdrachten:** `thema: "Vrij"` of leeg laten (`thema: ""`)

#### 6CRM (Leerjaar 6)
1. **September:** `Herhaling`
2. **Oktober–December:** `Zwaartekracht (Poëzieweek)`
3. **Januari–Maart:** `Fashion`
4. **April–Mei:** `Naar klant`
* **Vrije opdrachten:** `thema: "Vrij"` of leeg laten (`thema: ""`)

### Klasafspraken

- We tonen respect en begrip voor ieders eigenheid
- We gebruiken altijd en tegen iedereen gepaste taal
- We tonen geen grensoverschrijdend gedrag, fysieke of verbale agressie
- We dragen zorg voor het schoolgebouw en de omgeving
- We zijn steeds tijdig aanwezig op de afgesproken plaats
- We hebben steeds al ons materiaal bij
- We nemen een positieve werkhouding aan in de klas

---

## Structuur

```
├── archetypes/
│   └── opdracht/index.md      # Archetype met periodes/thema's en succescriteria-indeling
├── content/
│   ├── 2026-2027/
│   │   ├── 5crm/
│   │   │   ├── beeld/
│   │   │   ├── grafische/
│   │   │   ├── motion/
│   │   │   └── web-story/
│   │   └── 6crm/
│   │       ├── beeld/
│   │       ├── grafische/
│   │       ├── motion/
│   │       └── web-story/
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
│   │       ├── img/           # Schermafbeeldingen en visuele voorbeelden
│   │       └── index.md       # Cursus HTML (bouwstenen, tags, werkomgeving, structuur & formulieren)
│   └── doelen/
│       ├── _index.md          # Verzamelpagina doelstellingen
│       └── crossmedia.md      # 53 Crossmedia leerplandoelen & evaluatieclusters
├── data/
│   ├── clusters.yaml          # 6 Evaluatieclusters in volgorde van CRM sjabloon opdracht.docx
│   └── leerplandoelen.yaml    # Centrale dataset met alle 53 doelstellingen, codes en clusters
```

### Opdrachten als Page Bundles & Mappenstructuur
Opdrachten worden ingericht als modulaire Leaf Bundles (`content/2026-2027/{klas}/{vak}/{opdracht-slug}/`):

```text
{opdracht-slug}/
├── img/               # Alle afbeeldingen, illustraties en animaties (PNG, JPG, SVG, GIF)
├── index.md           # Opdrachtdocumentatie voor leerlingen
└── planning.md        # (Optioneel) Smartschool-lesplanning en fiches voor leerkrachten
```

- **Datumconventie:** `YYYY-MM-DD` (bv. `date: 2026-09-01`).
- **Paginatitels (`<title>`):**
  - Opdrachten: `Opdracht | Avant [Klas] [Vak]` (bv. `Parallax | Avant 6CRM Motion`).
  - Planning: `Opdracht (Planning) | Avant [Klas] [Vak]` (bv. `Parallax (Planning) | Avant 6CRM Motion`).
- **Titel- & Themahiërarchie:** De hoofding toont `Klas - Vaknaam` (met verkorte vaknaam in de sidebar header) en daaronder `Thema: Opdrachtnaam` (of enkel `Opdrachtnaam` indien `thema: ""` leeg is).
- **Homepagina:** Opdrachten worden gerangschikt per schooljaar, vak en klas met directe links naar de opdracht, de puntenverdeling en (indien aanwezig) de bijhorende lesplanning.

### Smartschool Lesplanning (`planning.md`)
Voor elke opdracht kan een optionele `planning.md` worden toegevoegd:
- **Aparte pagina via Custom Output Format:** Hugo genereert automatisch `.../planning.html` (bereikbaar via de link bij de opdracht op de homepage).
- **Afgeschermd voor leerlingen:** De planning-link verschijnt niet op de leerlingpagina van de opdracht zelf.
- **Automatische TOC (Lessen & Lesfiches):** De zijbalk genereert een semantisch geneste inhoudsopgave (`<ul><li>...<ul><li>...</li></ul></li>`) met CSS-nummering (`1.`, `1.1`, `1.2`, ...), een terug-link naar de opdracht en actieve highlighting (`font-weight: 700`) via scrollspy.

### Automatische WebP Image Processing & Responsive Beelden
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

### Link Render Hook & URL-Resolutie
Alle Markdown-links worden verwerkt via een **Link Render Hook** ([`render-link.html`](layouts/_default/_markup/render-link.html)):
- **Root-relatieve links (`/`):** Links die starten met een slash (bv. `[Cursus Fotografie](/cursus/fotografie/)` of `[Kijkkader](/2026-2027/5crm/beeld/kijkkader/#concept--thema)`) worden via `relURL` automatisch gekoppeld aan het `baseURL`-subpad (`/avant/`). Hierdoor werken links foutloos, zowel lokaal (`http://localhost:1313/avant/...`) als online op GitHub Pages (`https://vincentvandercruyssen.github.io/avant/...`).
- **Nieuw tabblad (`target="_blank"`):** Externe links en interne pagina-/cursusverwijzingen openen standaard in een nieuw tabblad met `rel="noopener noreferrer"`, zodat leerlingen de actieve opdracht niet verliezen.
- **In-page ankers (`#`):** Interne ankerverwijzingen binnen dezelfde pagina (startend met `#`, bv. `[Stap 1](#stap-1)`) navigeren direct binnen dezelfde pagina (zonder `target="_blank"`).
- **Relatieve downloadlinks:** Lokale bronnen binnen page bundles (zoals `[Voorbeeld](oefenbestanden/bestand.ai)`) behouden hun relatieve pad intact.

### Automatische Afbeeldingskolommen & Shortcodes
- **Gelijke kolommen (Pure Markdown):** Twee of meer afbeeldingen direct onder elkaar zonder witregel worden door de CSS automatisch gegroepeerd in gelijke kolommen (50/50 bij 2 beelden, 33/33/33 bij 3 beelden):
  ```markdown
  ![Voorgrond](voorgrond.png)
  ![Achtergrond](achtergrond.png)
  ```
- **Onevenredige kolommen:** Een breedteparameter op één van de afbeeldingen (bv. `?w=30%` of `#third`) laat de andere afbeelding de resterende breedte opvullen:
  ```markdown
  ![Groot overzicht](overzicht.png)
  ![Detailknop](knop.png?w=30%)
  ```
- **Responsief:** Op smalle schermen (≤ 600px) schakelen multi-image alinea's automatisch over naar een verticale stapeling.
- **Shortcode `{{< grid >}}`:** Voor gemengde content (tekst, code, beelden) naast elkaar ([`grid.html`](layouts/shortcodes/grid.html)):
  ```markdown
  {{< grid cols=2 gap="1rem" >}}
  Linkerkolom content...

  Rechterkolom content...
  {{< /grid >}}
  ```
- **Shortcode `{{< pinboard >}}`:** Voor het insluiten van een interactief Pinterest-bord ([`pinboard.html`](layouts/shortcodes/pinboard.html)):
  ```markdown
  {{< pinboard url="https://www.pinterest.com/gebruikersnaam/naam_board/" >}}
  ```
- **Shortcode `{{< video >}}`:** Voor het responsive insluiten van videobestanden binnen page bundles of de assetmap ([`video.html`](layouts/shortcodes/video.html)):
  ```markdown
  {{< video src="img/video.mp4" width="360" >}}
  ```
- **Shortcode `{{< demo_embed >}}`:** Voor het interactief demonstreren van HTML/CSS webpagina's en codevoorbeelden met live resultaat preview, syntax-highlighted code panels, tabs en fullscreen focus-weergave ([`demo_embed.html`](layouts/shortcodes/demo_embed.html)):
  ```markdown
  {{< demo_embed dir="voorbeelden/web-story/receptenboek" title="Receptenboek" height="650px" >}}
  ```

### Aanbevolen Stockplatformen (Bronmateriaal)
Voor opdrachten rond beeldbewerking, compositing en motion design gebruiken leerlingen rechtenvrij beeldmateriaal via:
- [Pexels](https://www.pexels.com/): Gratis rechtenvrije foto's en video's in hoge resolutie.
- [Unsplash](https://unsplash.com/): Uitgebreide bibliotheek met creatieve en artistieke stockfoto's.

### Evaluatieclusters, Indieningen & Succescriteria
Doelen worden centraal beheerd in `data/leerplandoelen.yaml` en `data/clusters.yaml`. De clusters worden **volledig automatisch** afgeleid en gerangschikt in de volgorde van het evaluatiesjabloon:
- **`indieningen:` (standaard voor nieuwe opdrachten):** Verdeelt een opdracht in afzonderlijke evaluatiemomenten (zoals `onderzoek` en `oplevering`) met eigen `deadline`, `lesuren`, `gewicht` en gewogen `leerplandoelen`.
- **`leerplandoelen:` (op hoofdniveau voor enkelvoudige opdrachten):** Ondersteunt zowel objecten (`code`, `gewicht`, `criterium`) als losse codes (bv. `"CRS21"`).
- **Puntenverdeling:** Hugo genereert op basis van de frontmatter automatisch een aparte puntenverdelingspagina (`puntenverdeling.html`) en rubriekweergave met het evaluatieniveau-kader (Niveau 0–3).

### Dynamische Table of Contents (TOC) & Scroll Spy
- **Diepte H2 tot H4:** Hugo genereert de inhoudsopgave van niveau 2 t.e.m. 4 (`[markup.tableOfContents] startLevel = 2, endLevel = 4`).
- **Inklapbare H4-subniveau's:** H4-onderdelen zijn standaard ingeklapt in de zijbalk en worden enkel zichtbaar wanneer het bijhorende H3-hoofdonderdeel actief is of door het scherm passeert.
- **Scroll Spy & Synchronisatie:** Tijdens het scrollen markeert vanilla JavaScript (`main.js`) automatisch de huidige actieve sectie (`.is-active`, `.has-active`) en scrollt het TOC-menu mee indien nodig.
- **Automatische hiërarchische nummering:** Zowel in de broodtekst als in de TOC worden koppen consistent genummerd via CSS counters (`1. `, `1.1 `, `1.1.1 `).

### Typografie & Auteurscredit
- **Typografie & Fonts:** De site gebruikt **Aptos** en **Aptos Mono**, lokaal geserveerd vanuit `static/fonts/` ([Microsoft Aptos Fonts](https://www.microsoft.com/en-us/download/details.aspx?id=106087)).
- **Dynamische Auteurscredit (`body::after`):** Elke pagina toont rechts verticaal een auteursbadge (`writing-mode: vertical-rl;`), automatisch samengesteld uit de sitetitel en het veld `auteurs:` in de frontmatter (voornamen gereduceerd tot initiaal, bv. `Avant - I. Doggen, B. Fockaert, V. Vander Cruyssen`).

---

## Sjabloon voor Nieuwe Opdrachten (`index.md`)

Onderstaand sjabloon dient als startpunt bij het aanmaken van een nieuwe opdracht (zie [`AGENTS.md`](AGENTS.md) voor alle redactionele, typografische en didactische schrijfregels):

```markdown
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
```

---

## Sjabloon voor Lesplanning (`planning.md`)

Onderstaand sjabloon toont de maatstaf voor een strakke, telegrafische Smartschool-lesfiche:

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

---

## Lokaal ontwikkelen

Vereisten: **Hugo Extended** (zie `.hugo-version`) en **Node.js**.

```bash
# Start de lokale ontwikkelserver (standaard poort 1313) + Save Server (poort 1315) + asset-spiegeling
npm run dev

# Productie build genereren
hugo --gc --minify
```

### Grading Pipeline, Rubrieken & Rechtstreekse Cijferinvoer

* **Asset-spiegeling (`assets/` → `static/`):** `npm run dev` ([`scripts/dev.js`](scripts/dev.js)) spiegelt de bronbestanden `assets/js/rubriek.js` en `assets/css/grading.css` automatisch naar `static/` bij het opstarten én via een live file watcher bij elke save (voor GitHub Pages).
* **Evaluatiemodi (Rubriek vs. Cijfer):** Het beoordelingspaneel ondersteunt zowel criteria-gebaseerde evaluatie via niveaublokken (Niveau 0–3) als rechtstreekse puntinvoer:
  * **Cijfermodus / Toetsen:** Indieningen van het type `cijfer` of toetsen (titel/id bevat 'toets') schakelen automatisch over naar een directe numerieke score per cluster (`/ max punten`).
  * **Modus-toggle:** Via de checkbox in de actiebalk kan per indieningsfase dynamisch gewisseld worden tussen niveaublokken en directe puntinvoer (`useRubrics: true/false`), met automatische bewaring in de rubriekdata.

---

## GitHub Pages Deployment

De site wordt automatisch gebouwd en gepubliceerd naar GitHub Pages via GitHub Actions (`.github/workflows/hugo.yaml`) bij elke push naar de `main` branch.
