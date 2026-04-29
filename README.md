# Trade Bridge

## 1. Project name
Trade Bridge

## 2. Project classification
Website with internal operations portal prototype and parallel Next.js conversion lane.

## 3. Business owner
Patrick Camacho

## 4. Execution owner
Van / Hermes

## 5. Technical owner
Van

## 6. Client/project owner
Patrick Camacho

## 7. Project summary
Trade Bridge is a U.S. ↔ Sri Lanka trade-intake and operations product. The public website markets sourcing, export coordination, trade-lane support, and supplier/buyer intake. The internal portal is an operations prototype for request intake, pricing and feasibility review, quote preparation, document coordination, shipment readiness, supplier outreach, compliance review, sanctions-screening workflow, analytics, and administrative settings. The active root runtime is a sanitized local Vite/React build. A separate `source-next/` lane exists for Next.js conversion work, but it is not yet the active production candidate.

## 8. Current phase
Phase 3 — Separate Next.js Conversion (in progress, not yet promoted).

## 9. Current status
- Root Vite runtime at `/home/patrick/projects/websites/trade-bridge/` is the active approved local baseline.
- Phase 1 local scrub: complete per report.
- Phase 2 baseline commit: complete per report.
- Phase 3 Next.js conversion lane exists at `/home/patrick/projects/websites/trade-bridge/source-next/`.
- Git currently shows `source-next/` as untracked, so the conversion lane is not yet committed into the root repository history.
- Production hardening and deployment remain blocked.

## 10. Approved phase path
1. Phase 1 — Local scrub and route stabilization in Vite/React
2. Phase 2 — Baseline commit of the stable local Vite version
3. Phase 3 — Separate Next.js conversion
4. Phase 4 — Production hardening
5. Phase 5 — Deployment

## 11. Next allowed phase
Continue and finish Phase 3 verification for `source-next/`, then commit or otherwise approve the conversion lane before Phase 4 begins.

## 12. Blocked phases/tasks
Blocked until Phase 3 is formally completed and reviewed:
- Phase 4 production hardening
- any production deployment or client-facing launch
- replacing the root Vite runtime with the Next.js lane
- claiming real backend, auth, document, screening, analytics, shipment-tracking, payment, or messaging capability
- claiming ADA, compliance, privacy, or security sign-off beyond the current placeholder/prototype state

## 13. Canonical paths
- Active project root and runnable Vite app: `/home/patrick/projects/websites/trade-bridge/`
- Parallel Next.js conversion lane: `/home/patrick/projects/websites/trade-bridge/source-next/`
- Project docs: `/home/patrick/projects/websites/trade-bridge/docs/`
- Project assets: `/home/patrick/projects/websites/trade-bridge/assets/`
- Project reports: `/home/patrick/projects/websites/trade-bridge/reports/`
- Project archive: `/home/patrick/projects/websites/trade-bridge/archive/`
- Historical raw imports lane: `/home/patrick/projects/imports/trade-bridge/`
- Historical sandbox lane used during scrub: `/home/patrick/projects/sandboxes/van/trade-bridge-phase-1-scrub/`

## 14. Repository/source rules
- Git repository root is `/home/patrick/projects/websites/trade-bridge/`.
- Branch currently reported by git: `main`.
- The runnable Vite app lives directly in the project root.
- `source-next/` is a separate conversion lane and must not silently replace the active root runtime.
- Do not mix Phase 3 conversion work with Phase 4 production hardening tasks.
- Do not work from Downloads or `/home/patrick/`.
- Do not claim parity or launch-readiness for `source-next/` until it has its own verified build/route QA and is approved.

## 15. Runtime/framework details
Active root runtime:
- Vite 6
- React 18
- React Router DOM 6
- Tailwind CSS 3
- TanStack React Query
- Radix UI components
- Local placeholder state via `localStorage`

Parallel conversion lane:
- Next.js 14 App Router lane in `source-next/`
- Preserves the Trade Bridge visual direction and route surface as a separate framework migration track
- Not yet the approved active runtime

Known runtime notes:
- Root build scripts are Vite-based.
- `source-next/` has its own `package.json` and Next.js scripts.
- No real backend service is wired in the active root runtime.

## 16. Local commands
Root Vite runtime:
```bash
cd /home/patrick/projects/websites/trade-bridge
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

Parallel Next.js lane:
```bash
cd /home/patrick/projects/websites/trade-bridge/source-next
npm install
npm run dev
npm run build
npm run lint
npm run start
```

## 17. Environment variables
Current known state:
- No required environment variables were identified in the active Vite root for local prototype use.
- No verified required environment variables were identified for `source-next/` from the current project inspection.
- If future integrations are added for auth, storage, notifications, analytics, sanctions screening, shipping, or payments, document every required variable here before those integrations are considered active.

## 18. Public routes/screens
Confirmed in `src/App.jsx` for the active Vite root:
- `/` — Home
- `/about` — About
- `/services` — Services
- `/us-product-sourcing` — U.S. Product Sourcing
- `/export-coordination` — Export Coordination
- `/sri-lanka-trade-lane` — Sri Lanka Trade Lane
- `/product-categories` — Product Categories
- `/how-it-works` — How It Works
- `/for-sri-lanka-buyers` — Buyer-focused page
- `/for-us-suppliers` — Supplier-focused page
- `/import-wholesale` — U.S. wholesale/import positioning
- `/request-quote` — Public quote request form
- `/contact` — Public contact form
- `/faq` — FAQ
- `/terms` — Terms of Service
- `/privacy` — Privacy Policy
- `/accessibility` — Accessibility Statement
- `/trade-compliance` — Trade Compliance Disclaimer
- `/restricted-items` — Restricted Items Policy
- `/restricted-items-policy` — Alias to Restricted Items Policy
- `/cookies` — Cookie Policy
- `*` — Local 404 page

## 19. Portal/app routes/screens
Confirmed in `src/App.jsx` for the active Vite root:
- `/portal/login` — Placeholder login
- `/portal/access-denied` — Access denied screen
- `/portal/unauthorized` — Access denied alias
- `/portal/forgot-password` — Placeholder forgot-password flow
- `/portal` — Admin dashboard
- `/portal/pricing` — Pricing dashboard
- `/portal/pricing-feasibility` — Pricing/feasibility alias
- `/portal/requests` — Requests inbox
- `/portal/requests/:id` — Request detail
- `/portal/requests/:id/feasibility` — Feasibility review
- `/portal/decision-queue` — Decision queue
- `/portal/supplier-tracker` — Supplier tracker
- `/portal/quote-builder` — Quote builder
- `/portal/shipment-readiness` — Shipment readiness
- `/portal/supplier-outreach` — Supplier outreach
- `/portal/documents` — Document library
- `/portal/document-reminders` — Document reminders
- `/portal/shipments` — Shipment tracking
- `/portal/tasks` — Task manager
- `/portal/risk-rules` — Product risk rules
- `/portal/clients` — Client management
- `/portal/suppliers` — Supplier management
- `/portal/suppliers-db` — Supplier management alias
- `/portal/importer-profiles` — Importer profiles
- `/portal/compliance-review` — Compliance review
- `/portal/audit-log` — Audit log
- `/portal/users` — User management
- `/portal/user-management` — User management alias
- `/portal/settings` — Portal settings
- `/portal/sanctions-screening` — Sanctions screening workflow
- `/portal/profit-margin` — Profit margin dashboard
- `/portal/analytics` — Analytics dashboard

## 20. Feature inventory
Real currently present in the local prototype:
- Multi-page public marketing website for the Trade Bridge offer
- Public legal/trust/compliance page set
- Public quote request form with local validation and local persistence
- Public contact form with local validation and local persistence
- Local 404 handling
- Internal portal UI shell with multiple operations screens
- Local placeholder auth/session shell using browser `localStorage`
- Local placeholder event capture for portal actions via `src/services/local/requestStore.js`
- Pricing, request review, quote, document, shipment, sanctions, analytics, client, supplier, and governance interfaces as prototype screens

Real but limited technical implementation:
- Local persistence helper at `src/services/local/requestStore.js`
- Local prototype session helper at `src/lib/AuthContext.jsx`
- Vite build/lint/dev scripts in the root runtime
- Historical reports documenting Phase 1 and Phase 2

## 21. Placeholder inventory
Placeholder-only or explicitly non-production at this time:
- Real backend/API integration
- Real authentication and RBAC
- Real document upload/storage
- Real email, SMS, or WhatsApp reminder delivery
- Real sanctions screening data sources or determinations
- Real shipment tracking/carrier integrations
- Real analytics exports and trusted reporting pipelines
- Real payment processing or Stripe checkout activation
- Real AI feasibility engine
- Final legal-reviewed privacy/cookie text
- Final production security controls and deployment configuration
- Production-ready Next.js runtime approval

## 22. Backend/data status
- Active root runtime is local-only and prototype-safe.
- Quote requests, contact messages, and portal events are stored in browser `localStorage`.
- Current storage keys are implemented in `src/services/local/requestStore.js`.
- No trusted database, queue, storage bucket, or server-side API was verified in this project inspection.
- Portal dashboards use sample/prototype data and should not be treated as live operational records.

## 23. Form/submission behavior
Public forms:
- `/request-quote` validates required fields, captures the selected filename only for uploads, saves the record locally, and shows success messaging that backend integration is still required.
- `/contact` validates required fields, saves the message locally, and clearly states final delivery requires backend integration.

Portal actions:
- Portal interactions save placeholder events locally where implemented.
- Reminder, screening, tracking, analytics export, and related operational actions are workflow prototypes, not live delivery systems.

Operational truth:
- No public or portal submission currently sends a live email, creates a real ticket, uploads a real file, or triggers a real backend workflow from the inspected root runtime.

## 24. Auth/security status
- Root runtime uses a local placeholder auth/session context in `src/lib/AuthContext.jsx`.
- Prototype login writes a browser-local session and assigns a placeholder operator identity.
- Public routes are available without real auth.
- Portal login is explicitly labeled as placeholder-only.
- No production-grade auth provider, server session validation, RBAC enforcement, audit retention policy, secrets management, or external identity integration was verified in this inspection.

## 25. Compliance/legal notes
- Trade compliance disclaimers are present and explicitly state that feasibility or AI-assisted recommendations are not legal, customs, tax, or compliance advice.
- Restricted items policy states requests may require specialist review and do not guarantee quote or sourcing action.
- Privacy Policy contains placeholder sections and is explicitly marked as pending legal review.
- Cookie Policy is explicitly placeholder content.
- Sanctions-screening portal language states screening is placeholder-only and not a legal compliance determination.
- Legal/compliance content exists, but final legal approval has not been documented in this repository state.

## 26. Accessibility/ADA status
- An accessibility statement route exists at `/accessibility`.
- The project provides a documented contact path for accessibility barriers.
- No formal ADA audit, keyboard-navigation audit, screen-reader audit, contrast audit, or remediation log was verified in this inspection.
- Accessibility status should be treated as partial and not legally certified.

## 27. SEO/metadata status
- Root `index.html` sets the document title to `Trade Bridge`.
- Root `index.html` links to `/manifest.json`.
- Basic metadata exists, but no full route-level SEO metadata strategy was verified in the root Vite app from this inspection.
- No evidence of a complete OG/Twitter/structured-data program was confirmed here.
- SEO should be treated as baseline/minimal, not production-hardened.

## 28. QA status
Historical verified status from reports:
- Phase 1 local scrub report recorded `npm install`, `npm run build`, and `npm run dev` as PASS for the root Vite runtime.
- Phase 1 report recorded public routes and portal routes as PASS locally.
- Phase 2 baseline report recorded `npm install`, `npm run build`, `npm run dev -- --host 127.0.0.1 --port 4178`, and HTTP verification as PASS.

Current README update status:
- This README refresh did not execute a new build or browser QA pass.
- Root Vite runtime remains the documented approved baseline based on prior reports.
- `source-next/` needs its own explicit QA record before it can be considered phase-complete.

## 29. Deployment status
- Deployment status: NOT DEPLOYED / local-only working baseline.
- No production deployment target, deployment manifest, or approved release process was verified during this README update.
- Production launch is blocked pending Phase 3 completion, Phase 4 hardening, and deployment readiness work.

## 30. Reports
Current known reports:
- `/home/patrick/projects/websites/trade-bridge/reports/2026-04-29-phase-1-local-scrub.md`
- `/home/patrick/projects/websites/trade-bridge/reports/phase-2-baseline-commit-report.md`

Report interpretation:
- Phase 1 report documents the sanitized local Vite baseline.
- Phase 2 report documents the baseline commit and verified route/build posture.
- No formal Phase 3 completion report was identified during this README update.

## 31. Git/commit status
Current observed git state from inspection:
- Repository branch: `main`
- Working tree note: `source-next/` is currently untracked

Implications:
- The root Vite baseline has a local git history per the Phase 2 report.
- The Next.js conversion lane exists in the project tree but is not yet represented as tracked committed work in the observed current status output.

## 32. Known issues
- `source-next/` is present but untracked in git.
- Bundle-size warning remains documented as non-blocking on the Phase 2 root build.
- Root portal and business workflows remain placeholder-only and non-production.
- Privacy Policy and Cookie Policy contain placeholder/provisional content.
- No verified production backend, auth, storage, notifications, sanctions, shipment, analytics, or payment integrations exist in the inspected active runtime.
- No completed Phase 3 verification report was identified during this README rewrite.

## 33. Next recommended work
1. Verify `source-next/` with explicit install/build/dev/lint checks and route parity review.
2. Decide whether `source-next/` should be committed as the approved Phase 3 lane or revised further.
3. Write a formal Phase 3 conversion report before any promotion decision.
4. If Phase 3 is approved, begin Phase 4 production hardening with explicit backend, auth, storage, notifications, compliance, accessibility, SEO, and deployment scopes.
5. Update this README again immediately after any Phase 3 approval, Phase 4 hardening milestone, or deployment milestone.

## 34. Agent operating rules
- Treat this README as the project’s single source of truth.
- Keep the root Vite runtime as the active approved baseline unless Patrick explicitly authorizes promotion of another runtime.
- Do not present placeholder workflows as real production capabilities.
- Do not deploy this project from the current state.
- Do not remove legal/compliance disclaimers without approved replacement copy.
- Do not merge or promote `source-next/` silently; verify and document it first.
- Update this README at every major phase transition: local scrub, baseline commit, framework conversion, production hardening, and deployment.
- When changing phase status, also update blocked work, next allowed phase, QA status, deployment status, git status, and placeholder inventory in this file.
#   t r a d e - b r i d g e  
 # trade-bridge
