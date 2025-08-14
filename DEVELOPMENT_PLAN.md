# DEVELOPMENT PLAN — diabeteshelp.in

## Principles
- Focus on one task at a time; ship small, testable increments.
- Firebase-first: Auth, Firestore, Storage, Functions.
- Non-commerce: lifestyle guidance only; no product sales.

## Prerequisites
- Expo SDK 53 with Expo Router.
- Firebase: Auth (Google, Phone), Firestore, Storage.
- Env vars:
  - EXPO_PUBLIC_FIREBASE_API_KEY
  - EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN
  - EXPO_PUBLIC_FIREBASE_PROJECT_ID
  - EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET
  - EXPO_PUBLIC_FIREBASE_SENDER_ID
  - EXPO_PUBLIC_FIREBASE_APP_ID

## Phases

### Phase 1 — MVP
- Authentication: Google Sign-In and Phone OTP; user doc creation
- Onboarding & Profile: basic, medical, lifestyle; BMI auto-calc; gate tabs
- Diet: simple food logging (CRUD) with macros; minimal `foods` lookup
- Glucose: record readings and show simple 7-day trend
- Dashboard: quick stats and quick actions; core navigation

### Phase 2 — Enhanced Features
- Personalized diet charts; advanced meal planning UI
- Reports: upload to Storage and basic analysis view
- Routine management tools with local reminders
- Improved UI/UX and accessibility pass

### Phase 3 — Advanced Analytics
- AI-powered insights (safe guidance) and deeper report analysis
- Wearable integrations (steps/health data where available)
- Community features and advanced personalization

### Phase 4 — Platform Expansion
- Partner lab/clinic integrations via secure webhook ingestion
- Healthcare provider integrations and telemedicine capabilities
- Advanced AI recommendations, multi-language support, international foods

## Actionable Checklist
- [ ] Google Sign-In (Expo Auth Session → Firebase credential)
- [ ] Phone OTP (Recaptcha → confirm → sign-in)
- [ ] Auth gating to onboarding
- [ ] Onboarding forms + validation
- [ ] Meal logging CRUD + daily list
- [ ] Seed `foods` + `nameLower` index
- [ ] Glucose CRUD + 7-day chart
- [ ] Dashboard stats + actions
- [ ] Reports upload + metadata
- [ ] Routines CRUD + notifications
- [ ] Partners webhook + HMAC + ingest
- [ ] Insights stub + persistence
- [ ] Security rules + Storage rules
- [ ] Indexes: meal_logs timestamp, foods nameLower, etc.
- [ ] QA + performance checks

## Definition of Done
- Runs on Android and iOS; startup < 3s.
- No cross-user access per security rules.
- Offline reads for recent data.

## References
- See `CONTEXT.md` for data models and endpoints.

---

## Detailed Phase-by-Phase Steps

### Phase 1 — Foundation (Step-by-Step)
- Objective: App scaffolding with routing, theming, and Firebase init
- Prereqs: Expo CLI installed; Firebase project created
- Steps:
  1) Verify dependencies in `package.json` (Expo 53, Expo Router, React Native Paper, Firebase)
  2) Wrap root with `PaperProvider` in `app/_layout.tsx` (already done)
  3) Add `src/services/firebase.ts` and wire `auth`, `db`, `storage` (already done)
  4) Create `app/auth/sign-in.tsx` and `app/auth/verify-otp.tsx` placeholders (already done)
  5) Boot app on Android/iOS to confirm routing and theming work
- Acceptance:
  - App starts and navigates tabs without errors; theme toggles
- Artifacts: `app/_layout.tsx`, `src/services/firebase.ts`, `app/auth/*`

### Phase 1 — Authentication (Step-by-Step)
- Objective: Functional sign-in/out with session persistence
- Prereqs: Enable Google & Phone providers in Firebase Console
- Steps:
  1) Google Sign-In
     - Configure OAuth client in Firebase → add Expo redirect URL
     - Implement `useAuthRequest` (Expo Auth Session) in `sign-in.tsx`
     - Exchange Google ID token for Firebase credential via `signInWithCredential`
  2) Phone OTP
     - Add reCAPTCHA verifier (Expo compatible) and set up `verifyPhoneNumber`
     - Send OTP from `sign-in.tsx`; receive `confirmationResult`
     - In `verify-otp.tsx`, confirm code → sign-in
  3) User document
     - On first login, create/update `users/{uid}` with minimal profile and timestamps
  4) Sign-out action and session listener
     - Add auth state listener; keep user across restarts
- Acceptance:
  - Can login via Google and Phone OTP; sign-out works; session persists
- Artifacts: `src/services/auth.ts` (helpers), updated `app/auth/*`

### Phase 1 — Onboarding & Profile (Step-by-Step)
- Objective: Collect and persist profile, medical, and lifestyle data
- Prereqs: Auth gating available
- Steps:
  1) Create `app/onboarding/*` stack: Basic → Medical → Lifestyle → Review
  2) Forms with validation; compute BMI; persist to `users/{uid}` per `CONTEXT.md`
  3) Route guard
     - If `onboardingCompleted !== true`, redirect to onboarding on app open
  4) Edit profile screen under `(tabs)/profile`
- Acceptance:
  - New users complete onboarding before accessing tabs; data saved and editable
- Artifacts: `src/features/profile/*`, `app/onboarding/*`

### Phase 1 — Diet: Food Logging (MVP) (Step-by-Step)
- Objective: Log meals with macros and list by day
- Steps:
  1) Data types for meal log; CRUD to `users/{uid}/meal_logs`
  2) Seed `foods` with minimal entries; add `nameLower` field
  3) Search UI: by name; suggestion list; select → prefill nutrition
  4) Meal log detail: show macros summary and timestamp; filter by date
- Acceptance:
  - Can create/list meal logs; search foods; macros displayed
- Artifacts: `src/features/diet/*`, `app/(tabs)/diet.tsx`

### Phase 1 — Glucose Readings (Step-by-Step)
- Objective: Record glucose values with context and view trends
- Steps:
  1) CRUD for `users/{uid}/glucose_readings`
  2) List by date; simple 7-day trend chart (client-only)
  3) Optional: notes field and meal context
- Acceptance:
  - Add, list, and visualize recent readings; no crashes
- Artifacts: `src/features/glucose/*`, chart component

### Phase 1 — Dashboard (Step-by-Step)
- Objective: At-a-glance stats and actions
- Steps:
  1) Quick Stats: latest glucose, last meal, steps (placeholder)
  2) Quick Actions: log meal, record glucose, view reports
  3) Trend cards: 7-day summaries
- Acceptance:
  - Loads <3s; actions navigate correctly
- Artifacts: `app/(tabs)/index.tsx` dashboard widgets

### Phase 2 — Reports Upload & Analysis (MVP) (Step-by-Step)
- Objective: Upload and view medical reports
- Steps:
  1) Add upload via document/image picker → Storage `reports/{uid}/{reportId}/...`
  2) Create report doc in `users/{uid}/reports`
  3) Report detail: metadata and attachment link; placeholder analysis map
- Acceptance:
  - Files upload; metadata visible; can open attachment
- Artifacts: `src/features/reports/*`, Storage paths

### Phase 2 — Routines & Reminders (Step-by-Step)
- Objective: Local reminders for routines
- Steps:
  1) CRUD for `users/{uid}/routines` and `reminders`
  2) Schedule local notifications; toggle enable/disable
  3) Handle time zones and repeat rules (daily/weekly)
- Acceptance:
  - Reminders fire on schedule; updates reflect immediately
- Artifacts: `src/features/routines/*`

### Phase 3 — Lab/Clinic Partners Integration (Step-by-Step)
- Objective: Ingest partner lab results securely
- Steps:
  1) Create `partners/{partnerId}` and `tests` subcollection
  2) Cloud Function HTTPS endpoint `/webhooks/partners/lab-results`
     - Validate HMAC with partner key; verify payload schema
  3) Persist to `users/{uid}/lab_results` and link to report file if present
  4) Admin tooling: enable/disable partners
- Acceptance:
  - Test webhook ingests sample payload; appears in Reports
- Artifacts: `functions/*`, security rules updates

### Phase 3 — AI Insights (Placeholder) (Step-by-Step)
- Objective: Show insights safely (non-medical advice)
- Steps:
  1) Callable function stub to fetch/generate insights (DeepSeek or mock)
  2) Store in `users/{uid}/insights`; list in UI with timestamps
  3) Add disclaimers per compliance
- Acceptance:
  - Insights appear deterministically; safe content
- Artifacts: `functions/insights.ts`, `src/features/insights/*`

### Phase 4 — Security & Performance (Step-by-Step)
- Objective: Harden access and improve speed
- Steps:
  1) Firestore Rules: users scope; foods public-read; partners admin-only; Storage paths
  2) Indexes: `meal_logs.timestamp+mealType`, `glucose_readings.timestamp`, `foods.nameLower`
  3) Enable Firestore persistence; cache recent queries
  4) Measure cold start and list rendering; optimize as needed
- Acceptance:
  - Security tests pass; offline reads work; performance targets met
- Artifacts: `firestore.rules`, `storage.rules`, index configs

### Phase 4 — QA, Beta & Polish (Step-by-Step)
- Objective: Stabilize for beta users
- Steps:
  1) Test plan execution (unit/integration/UAT); fix blockers
  2) Error/crash reporting (optional): integrate a reporter
  3) Accessibility pass; copy polish; empty states
  4) Beta build and release notes
- Acceptance:
  - MVP criteria met; app usable end-to-end
- Artifacts: test reports, beta builds

## Cross-Cutting Tasks
- Analytics events map (non-PII) and toggles
- Localization scaffolding (future multi-language support)
- Backups/exports policy and user data deletion flow