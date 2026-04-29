# Trade Bridge — Phase 1 Local Scrub Report

Project: Trade Bridge
Phase: Phase 1 — Local Scrub
Source import path: /home/patrick/projects/imports/trade-bridge/2026-04-29/Tradebridge_Global.zip
Working path used during implementation: /home/patrick/projects/sandboxes/van/trade-bridge-phase-1-scrub/extracted/
Report path: /home/patrick/projects/websites/trade-bridge/reports/2026-04-29-phase-1-local-scrub.md

Summary
- Removed the legacy hosted-platform runtime from the active app.
- Replaced platform-backed form and portal actions with local-safe placeholder behavior.
- Stabilized Vite/React install, build, and dev startup.
- Preserved public and portal route coverage.
- Promoted the cleaned local app into the Trade Bridge project workspace.

Verification
- npm install: PASS
- npm run build: PASS
- npm run dev: PASS
- Public routes render locally: PASS
- Portal routes render locally: PASS

Implementation highlights
- Clean local Vite config with React plugin and alias support
- Local auth/session placeholder for portal access flows
- Local-safe placeholder persistence for quote/contact/portal actions
- Clean local 404 behavior
- Branding corrected to Trade Bridge
- Manifest added for local app branding

Route baseline preserved
- Public site routes remain available
- Portal dashboard and operations routes remain available
- Forgot-password route remains available
- Legal and trust routes remain available

Known placeholders
- real backend
- real auth/RBAC
- real file storage/uploads
- real email/SMS/WhatsApp delivery
- real sanctions screening
- real shipment tracking
- real analytics exports
- real payment processing
- real AI feasibility agent

Notes
- The old unsanitized sandbox and pre-clean archive were later removed as part of the full reference cleanup.
- The active runnable project now lives at `/home/patrick/projects/websites/trade-bridge/`.

Next recommended phase
- Phase 2 — baseline commit of the stable local Vite version
