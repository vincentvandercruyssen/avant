# Hugo Server Guidelines

## Port Configuration
- Always run Hugo on port **1313**: `hugo server -p 1313` (or `npm run dev`).
- **Never** spin up Hugo on an alternate port (such as 1314, 1315, etc.).

## Server Lifecycle & Single Instance
- Before starting a Hugo server, check if port 1313 is already in use by Hugo (e.g. running in the user's terminal or background).
- If Hugo is already active on port 1313, do **not** start a second server. Reuse the existing running instance.
- The base local URL for previewing is `http://localhost:1313/avant/`.
