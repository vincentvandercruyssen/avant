# Avant

Statische [Hugo](https://gohugo.io/)-site voor lesmateriaal en cursussen.

**Live site:** https://vincentvandercruyssen.github.io/avant/

## Lokaal bouwen

Vereisten: **Hugo Extended** (zie `.hugo-version`) en **Node.js**.

```bash
# Lokale ontwikkelserver starten
hugo server

# Productiebuild genereren
hugo --gc --minify
```

## Deployment

De site wordt automatisch gebouwd en gepubliceerd via GitHub Pages (`.github/workflows/hugo.yaml`) bij elke push naar `main`.
