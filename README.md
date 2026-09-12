# Circular Carbon Hackout

This repository keeps the public landing experience and the Circular Carbon MVP separate.

- `landing/` contains the standalone animated landing page. Its **Run Diagnostic** action opens the MVP; configure the destination with the landing URL query parameter, for example `?app=https://your-mvp-domain`.
- `mvp/` contains the application, including the frontend and calculation/data modules in `mvp/backend/`.

For local development, start the MVP frontend from `mvp/frontend/`, then serve `landing/` and point its `app` query parameter at the MVP's local address.
