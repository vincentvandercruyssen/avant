# Avant — Crossmedia (CRM)

Lesmateriaal, opdrachten en cursussen voor de richting **Crossmedia (5CRM & 6CRM)** aan school **Avant**.

## 🚀 Overzicht

Deze Hugo-site fungeert als intern werkdashboard en opdrachtgenerator voor leerkrachten en leerlingen binnen het domein *Kunst & Creatie (Dubbele Finaliteit)*.

### 📚 Vakken & Titularissen (2026-2027)

- **Motion (4u):** Vincent Vander Cruyssen *(5CRM & 6CRM)*
- **Webdesign en storytelling (3u):** Vincent Vander Cruyssen *(5CRM & 6CRM)*
- **Beeldanalyse en -bewerking (2u):** Vincent Vander Cruyssen *(5CRM & 6CRM)*
- **Grafische vormgeving (4u):** Emelie Van de Peer *(5CRM)* & Birthe Fockaert *(6CRM)*

---

## 📂 Structuur

```
content/
├── 2026-2027/
│   ├── 5crm/
│   │   ├── beeld/
│   │   ├── grafische/
│   │   ├── motion/
│   │   └── web/
│   └── 6crm/
│       ├── beeld/
│       ├── grafische/
│       ├── motion/
│       └── web/
└── cursussen/
    ├── after_effects.md
    ├── blender.md
    └── fotografie.md
```

### 📄 Opdrachten als Page Bundles
Opdrachten worden ingericht als Leaf Bundles (`content/2026-2027/{klas}/{vak}/{opdracht-slug}/index.md`), zodat afbeeldingen en bijlagen direct binnen de opdrachtmap bewaard en verwerkt worden.

### 🎯 Evaluatieclusters & Leerplandoelen
Doelen worden centraal beheerd in `data/leerplandoelen.yaml` en automatisch gerenderd via het partial `opdracht-evaluatie.html` op basis van frontmatter-metadata:
- `leerplandoelen:` (lijst met CRS-codes)
- `clusters:` (boolean flags voor analyse_workflow, design_layout, multimediaproductie, release_presentatie, kwaliteit_context, professionele_competenties)

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
