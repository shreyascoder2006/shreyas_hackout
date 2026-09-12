# Circular Carbon Intelligence

A single deployable MVP with a landing-first journey and the complete industrial decarbonisation platform.

## Routes

- `/` — animated Circular Carbon landing page
- `/app.html` — product dashboard
- `#/simulate`, `#/plan`, `#/regulator`, `#/portfolio`, `#/intake`, and `#/co2-exchange` — product modules after opening the app

The landing page's **Run Diagnostic** action opens `/app.html`, so both experiences ship from the same project and domain.

## Run locally

```powershell
npm ci
npm run dev
```

Open the local URL printed by Vite. The app's complete calculation/data modules are in `backend/`.
