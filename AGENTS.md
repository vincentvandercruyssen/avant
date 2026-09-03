# Agent Instructions for Avant

- **Hugo Port**: Always use port `1313` (`hugo server -p 1313` or `npm run dev`).
- **Single Instance**: Hugo watches files and live-reloads automatically. Before starting a server, check if Hugo is already running on port 1313. Never start a second server on a different port (e.g. 1314).
