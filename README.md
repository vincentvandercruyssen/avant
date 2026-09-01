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

### 🤝 Klasregels

- We tonen respect en begrip voor ieders eigenheid
- We tonen geen grensoverschrijdend gedrag, fysieke of verbale agressie
- We dragen zorg voor het schoolgebouw en de omgeving
- We zijn steeds tijdig aanwezig op de afgesproken plaats
- We hebben steeds al ons materiaal bij
- We nemen een positieve werkhouding aan in de klas
- We gebruiken altijd en tegen iedereen gepaste taal

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
│   │   ├── after_effects.md
│   │   ├── blender.md
│   │   └── fotografie.md
│   └── doelen/
│       ├── _index.md          # Verzamelpagina doelstellingen
│       └── crossmedia.md      # 53 Crossmedia leerplandoelen & evaluatieclusters
├── data/
│   ├── clusters.yaml          # 6 Evaluatieclusters in volgorde van CRM sjabloon opdracht.docx
│   └── leerplandoelen.yaml    # Centrale dataset met alle 53 doelstellingen, codes en clusters
```

### 📄 Opdrachten als Page Bundles
Opdrachten worden ingericht als Leaf Bundles (`content/2026-2027/{klas}/{vak}/{opdracht-slug}/index.md`), zodat afbeeldingen en bijlagen direct binnen de opdrachtmap bewaard en verwerkt worden.

- **Titelconventie (1 kernwoord):** Gebruik bij voorkeur **één beknopte, krachtige naam** (bv. `title: "Parallax"`, `title: "Paspoort"`, `title: "Bauhaus"`, `title: "Lookbook"`). Dit houdt de weergave in de sidebar, navigatie en dashboards strak en overzichtelijk.
- **Titel- & Themahiërarchie:** De hoofding toont `Klas - Vaknaam` (met verkorte vaknaam in de sidebar header) en daaronder `Thema: Opdrachtnaam` (of enkel `Opdrachtnaam` indien `thema: ""` leeg is).
- **Geen horizontale scheidingslijnen (`---` / `<hr>`):** Gebruik **geen `---`** in de Markdown-body van opdrachten. De visuele structuur, rust en hiërarchie worden volledig gedragen door semantische koppen (`##`, `###`, `####`), witruimte, callouts en de automatische CSS-lay-out.
- **Didactische toon & Aanspreekvorm (geen "we"):** Schrijf opdrachten in een directe, activerende stijl gericht naar de individuele leerling (**je / jij / jouw** of actieve imperatief: *"Open de browser"*, *"Onderzoek de broncode"*, *"Voor je start..."*). Vermijd meervoudsvormen zoals *"we"*, *"wij"*, *"ons"* of *"laten we"* (bv. niet *"Voordat we coderen..."*, maar *"Voor je start met coderen..."*). Dit stimuleert zelfstandigheid en eigenaarschap over het leerproces.
- **Homepagina:** Opdrachten worden gerangschikt per schooljaar, vak en klas met weergave van het thema.

### 🖼️ Automatische WebP Image Processing & Responsive Beelden
Alle Markdown-afbeeldingen worden via een **Image Render Hook** ([`render-image.html`](file:///f:/Webhost/hugo/avant/layouts/_default/_markup/render-image.html)) automatisch geoptimaliseerd:
- **WebP & Responsive `srcset`:** Converteert PNG/JPG automatisch naar WebP met breakpoints voor smartphone (`480w`, `768w`), 15" laptop (`1080w`, `1440w`) en 27" desktop (`1920w`).
- **Formaat- & Stijlparameters in Markdown:**
  - **Query parameters:** `![Alt](foto.png?width=450px)` of `![Alt](foto.png?w=60%)`
  - **Snelle hashtags:**
    - `#small` (380px breed)
    - `#medium` (600px breed)
    - `#half` of `#50%` (50% kolombreedte)
    - `#third` of `#33%` (33.3% kolombreedte)
    - `#center` (gecentreerd uitlijnen, bv. `![Alt](foto.png#half#center)`)

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
- **Shortcode `{{< grid >}}`:** Voor meer complexe lay-outs of gemengde content (tekst, code, beelden) is er een lichte grid-shortcode ([`grid.html`](file:///f:/Webhost/hugo/avant/layouts/shortcodes/grid.html)):
  ```markdown
  {{< grid cols=2 gap="1rem" >}}
  Linkerkolom content...

  Rechterkolom content...
  {{< /grid >}}
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
- **Semantische HTML & CSS Structuur:** We vermijden overbodige utility-classes of BEM-klassen in de HTML (bv. geen `.sc-main-header`).
- **Structurele Selectors:** Styling gebeurt bij voorkeur via de natuurlijke logica van CSS: elementselectors, structurele pseudo-classes (`:first-child`, `:nth-child()`, `:has()`), en attribuutselectors.

---

## 🛠️ Lokaal ontwikkelen

Vereisten: **Hugo Extended** (zie `.hugo-version`) en **Node.js**.

```bash
# Start de lokale ontwikkelserver
hugo server

# Productie build genereren
hugo --gc --minify
```

---

## 🚢 GitHub Pages Deployment

De site wordt automatisch gebouwd en gepubliceerd naar GitHub Pages via GitHub Actions (`.github/workflows/hugo.yaml`) bij elke push naar de `main` branch.
