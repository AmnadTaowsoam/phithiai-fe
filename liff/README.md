# phithiai LIFF Workspace

Skeleton for the LINE LIFF companion experience that will power concierge chat, booking nudges, and quick vendor actions within LINE.

## Current Status

- Empty source folders (`app/`, `components/`, `hooks/`, `lib/`, `styles/`, `tests/`) waiting for implementation.
- No toolchain configured yet – choose the stack that best matches the LIFF requirements (Next.js, Vite + React, or vanilla LIFF SDK).

## Recommended Next Steps

1. **Plan the LIFF flows**  
   Map the conversational journeys in `docs/feature-specs.md` (Lead Inbox, Quick Reply templates, payment confirmations) to LIFF screens.

2. **Bootstrap the app**  
   - Pick the framework (Next.js App Router is fine if you want parity with the web app; Vite also works for lighter bundles).  
   - Configure environment variables for `LIFF_ID`, `API_BASE_URL`, and authentication tokens.  
   - Set up linting/formatting based on the standards in `docs/development-guide.md`.

3. **Integrate with services**  
   - Fetch concierge data from the admin service (`/consultations`, `/vendors`, etc.).  
   - Consume Pack 0 APIs for booking status, vendor responses, and notifications.  
   - Implement secure login (LIFF auth + JWT exchange with phithiai platform).

4. **Testing & Deployment**  
   - Add unit tests in `tests/` and consider Playwright/Cypress for smoke tests.  
   - Prepare deployment scripts (LIFF channel registration + CDN upload or static hosting).

Keep this README updated as the LIFF project evolves so other teammates know the current setup and pending work.
