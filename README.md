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

---

## 📂 Structuur

```
├── archetypes/
│   └── opdracht/index.md      # Archetype met alle cluster-flags en periodes/thema's
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
└── data/
    └── leerplandoelen.yaml    # Centrale dataset met alle doelstellingen, codes en clusters
```

### 📄 Opdrachten als Page Bundles
Opdrachten worden ingericht als Leaf Bundles (`content/2026-2027/{klas}/{vak}/{opdracht-slug}/index.md`), zodat afbeeldingen en bijlagen direct binnen de opdrachtmap bewaard en verwerkt worden.

- **Titel- & Themahiërarchie:** De hoofding toont `Klas - Vaknaam` (met verkorte vaknaam in de sidebar header) en daaronder `Thema: Opdrachtnaam` (of enkel `Opdrachtnaam` indien `thema: ""` leeg is).
- **Homepagina:** Opdrachten worden gerangschikt per schooljaar, vak en klas met weergave van het thema.

### 🎯 Evaluatieclusters & Leerplandoelen
Doelen worden centraal beheerd in `data/leerplandoelen.yaml` en automatisch gerenderd via het partial `opdracht-evaluatie.html` op basis van frontmatter-metadata:
- `leerplandoelen:` (lijst met doelcodes zoals `CRS01`, `SV01.01`, `13.01`, `16.04`, etc.)
- `clusters:` (boolean flags voor `analyse_workflow`, `design_layout`, `multimediaproductie`, `release_presentatie`, `kwaliteit_context`, `professionele_competenties`)

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
