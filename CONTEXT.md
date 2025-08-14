## DiabetesHelp.in — App Development Specification

### Overview
- **App Name:** diabeteshelp.in
- **Purpose:** Digitalize diabetes management through comprehensive health tracking, personalized diet planning, and medical report analysis.
 - **Purpose:** Digitalize diabetes management through comprehensive health tracking, personalized diet planning, and medical report analysis. No e‑commerce or product sales; lifestyle guidance only.
- **Target Audience:** Individuals with diabetes, pre-diabetes, and health-conscious users seeking lifestyle management.

### Design System

#### Color Palette
| Role | Hex | Description |
|---|---|---|
| Primary | `#2D6A9D` | Deep calming blue: trust, reliability, medical professionalism |
| Secondary | `#5CB85C` | Fresh healthy green: health, vitality, positive outcomes |
| Light Blue | `#E8F4FD` | Background highlights |
| Dark Green | `#4A9A4A` | Success states |
| Warning | `#F39C12` | Alerts |
| Error | `#E74C3C` | Critical values |
| Neutral | `#7F8C8D` | Secondary text |

#### Typography
- **Headers:** Bold, clean sans-serif (Roboto/Inter)
- **Body:** Regular weight, high readability
- **Data Values:** Monospace for numeric consistency

### Core Features & User Flow

#### 1. User Onboarding & Profile Creation
- Registration flow:
```
Welcome Screen → Registration → Profile Setup → Health Assessment → Dashboard
```

- Profile information:
  - **Basic:** Name, Age, Gender; Height, Weight, BMI (auto-calculated); Contact info; Emergency contact
  - **Medical:** Diabetes type; Date of diagnosis; Current medications; HbA1c (last 3); Comorbidities; Allergies/dietary restrictions
  - **Lifestyle:** Activity level; Sleep patterns; Stress levels; Smoking/alcohol; Dietary preferences

#### 2. Dashboard & Home
- **Quick Stats Card:** Current glucose, last meal, steps today
- **Today's Overview:** Diet adherence, medication reminders, activity summary
- **Trends:** Weekly glucose trends, weight progress
- **Quick Actions:** Log meal, record glucose, view reports
- **Notifications:** Medication reminders, appointment alerts

- Navigation:
```
Bottom Navigation:
├── Home (Dashboard)
├── Diet
├── Reports
├── Routine
└── Profile
```

#### 3. Diet Management

- Personalized diet chart generation:
  - Carbohydrate counting, glycemic index recommendations
  - Portion sizes from user profile
  - Cultural/regional preferences and budget
- Diet chart features:
  - Weekly plans with 6 meals/day
  - Macronutrient breakdown; calorie distribution
  - Recipe suggestions with instructions
  - Shopping list and meal prep guidance

- Food logging & tracking:
  - **Database:** Indian foods + international; nutrition per serving; glycemic index; portion guides
  - **Logging:** Search/select; barcode scan; photo with AI; voice input; custom recipes

- Meal planning interface:
```
Diet Section:
├── Today's Meals
├── Weekly Plan
├── Recipe Book
├── Shopping List
├── Food Log History
└── Nutrition Analytics
```

#### 4. Daily Routine Management
- **Morning:** Wake-up time/quality; morning glucose; medications; exercise/yoga; breakfast timing/composition
- **Daytime:** Work schedule integration; meal reminders; hydration; activity breaks; stress management
- **Evening:** Dinner timing; evening exercise; bedtime glucose; sleep prep; next-day meal prep
- **Customization:** Flexible schedules; weekday/weekend modes; travel mode; seasonal changes; goal-based optimization

#### 5. Medical Reports Analysis
- **Uploads:** Blood glucose logs; HbA1c; lipid profile; kidney function; eye exams; foot care; blood pressure
- **Methods:** Document scan; photo + OCR; manual entry; provider integration (future); wearable sync
 - **Methods:** Document scan; photo + OCR; manual entry; provider integration (future); wearable sync; partner diagnostic labs/clinics via secure API/webhook
- **Analysis:** Trends over time; target comparisons; risk indicators; lifestyle correlations; predictive insights
- **Visuals:** Interactive charts; color-coded indicators; progress tracking; comparisons; shareable summaries

#### 6. Advanced Features
- **AI Insights:** Personalized recommendations; meal timing; exercise; medication adherence; risk prediction
- **Integrations:** Fitness trackers; glucose meters; calendar apps; provider portals; pharmacy refills
 - **Integrations:** Fitness trackers; glucose meters; calendar apps; provider portals; pharmacy refills (no in‑app product sales); diagnostic lab/clinic partners for results ingestion and appointment coordination
- **Community:** Expert booking; peer groups; education library; recipe sharing; success stories

### Technical Implementation

#### Tech Stack
- Frontend: React Native (TypeScript), Expo, Expo Router
- Backend/Database: Firebase
- UI Framework: React Native Paper
- AI Processing: DeepSeek
 - Auth: Firebase Authentication (Google Sign-In, Phone OTP)

#### Project Structure (Expo + Expo Router)
```
root
├── app/                               # Expo Router routes
│   ├── (tabs)/
│   │   ├── index.tsx                  # Home (Dashboard)
│   │   ├── diet.tsx
│   │   ├── reports.tsx
│   │   ├── routine.tsx
│   │   └── profile.tsx
│   ├── auth/
│   │   ├── sign-in.tsx                # Google sign-in, phone OTP entry
│   │   └── verify-otp.tsx             # OTP verification screen
│   └── _layout.tsx                    # Tabs/stack layout
├── src/
│   ├── components/                    # Reusable UI components
│   ├── features/
│   │   ├── dashboard/
│   │   ├── diet/
│   │   ├── reports/
│   │   ├── routine/
│   │   └── profile/
│   ├── services/
│   │   ├── firebase.ts                # Firebase init (Auth, Firestore, Storage)
│   │   ├── auth.ts                    # Google/Phone auth helpers
│   │   └── analytics.ts               # Optional analytics wrappers
│   ├── store/                         # State (Zustand/Redux) if needed
│   ├── hooks/
│   ├── utils/
│   └── theme/
├── assets/                            # Images, fonts, icons
├── functions/                         # Firebase Cloud Functions (optional)
├── app.json / app.config.ts
├── firebase.json
├── firestore.rules
├── storage.rules
└── package.json
```

#### 7. Data Architecture

- Key tables (conceptual):
```sql
Users
├── user_id, profile_data, medical_history
├── preferences, goals, settings

Food_Database
├── food_id, name, nutritional_info
├── glycemic_index, portion_sizes

Meal_Logs
├── log_id, user_id, food_id, quantity
├── timestamp, meal_type

Glucose_Readings
├── reading_id, user_id, value
├── timestamp, meal_context

Reports
├── report_id, user_id, type, data
├── upload_date, analysis_results
```

#### 7.1 Firebase Authentication
- Providers: Google Sign-In, Phone (OTP)
- User identity: `uid` from Firebase Auth maps 1:1 to `users/{uid}` document
- Session: ID token on device; refresh handled by Firebase SDK
- MFA (optional): Enable phone as second factor in console

#### 7.2 Firestore Collections & Documents
- Collection: `users/{uid}`
  - Fields:
    - `email` (string | null), `phoneNumber` (string | null), `displayName` (string | null), `photoURL` (string | null)
    - `createdAt` (timestamp), `lastLoginAt` (timestamp)
    - `onboardingCompleted` (boolean)
    - `profile` (map): `age` (number), `gender` (string), `heightCm` (number), `weightKg` (number), `bmi` (number),
      `contact` (map), `emergencyContact` (map)
    - `medical` (map): `diabetesType` (string), `diagnosisDate` (timestamp),
      `medications` (array<map{name, dosage, schedule}>),
      `hba1cHistory` (array<map{value:number, date:timestamp}>),
      `comorbidities` (array<string>), `allergies` (array<string>)
    - `preferences` (map): `dietaryPreferences` (array<string>), `restrictions` (array<string>),
      `activityLevel` (string), `sleepPattern` (string), `goals` (map)
  - Subcollections (per user):
    - `meal_logs/{logId}`: { `foodId` (string | null), `foodName` (string), `quantity` (number),
      `unit` (string), `timestamp` (timestamp), `mealType` (string), `macros` (map{carbs, protein, fat, fiber, calories}) }
    - `glucose_readings/{readingId}`: { `value` (number), `timestamp` (timestamp), `mealContext` (string | null), `notes` (string | null) }
    - `reports/{reportId}`: { `type` (string), `uploadDate` (timestamp), `filePath` (string), `analysisResults` (map | null) }
    - `routines/{routineId}`: { `name` (string), `schedule` (map), `enabled` (boolean) }
    - `reminders/{reminderId}`: { `title` (string), `time` (timestamp), `repeat` (string | map), `enabled` (boolean) }
    - `notifications/{notificationId}`: { `title` (string), `body` (string), `createdAt` (timestamp), `read` (boolean) }
    - `devices/{deviceId}`: { `platform` (string), `pushToken` (string), `lastActiveAt` (timestamp) }
    - `insights/{insightId}`: { `category` (string), `message` (string), `createdAt` (timestamp), `meta` (map) }

- Collection: `foods/{foodId}` (public, managed by admins)
  - Fields: `name` (string), `nameLower` (string), `servingSize` (map{amount:number, unit:string}),
    `nutritionPerServing` (map{calories, carbs, protein, fat, fiber, gi:number | null}),
    `tags` (array<string>), `cuisine` (string)

- Collection: `partners/{partnerId}` (managed by admins)
  - Fields: `name` (string), `type` ("lab" | "clinic"), `contact` (map), `active` (boolean), `webhookUrl` (string | null), `apiKeyHash` (string | null), `regions` (array<string>)
  - Subcollections:
    - `tests/{testId}`: { `code` (string), `name` (string), `units` (string), `referenceRange` (map{low:number, high:number}), `loinc` (string | null) }

- Per-user subcollections:
  - `users/{uid}/lab_orders/{orderId}`: { `partnerId` (string), `tests` (array<string>), `status` ("ordered" | "collected" | "reported"), `scheduledAt` (timestamp | null), `reportedAt` (timestamp | null) }
  - `users/{uid}/lab_results/{resultId}`: { `orderId` (string), `partnerId` (string), `results` (array<map{testCode, value:number|string, units:string, flag:string|null}>), `reportFilePath` (string | null), `ingestedAt` (timestamp) }

Example `users/{uid}` document:
```json
{
  "email": "user@example.com",
  "phoneNumber": "+91XXXXXXXXXX",
  "displayName": "A. Kumar",
  "createdAt": {"_seconds": 0, "_nanoseconds": 0},
  "onboardingCompleted": true,
  "profile": {"age": 34, "gender": "male", "heightCm": 175, "weightKg": 78, "bmi": 25.5},
  "medical": {
    "diabetesType": "type2",
    "diagnosisDate": {"_seconds": 0, "_nanoseconds": 0},
    "medications": [{"name": "Metformin", "dosage": "500mg", "schedule": "BID"}],
    "hba1cHistory": [{"value": 6.9, "date": {"_seconds": 0, "_nanoseconds": 0}}]
  },
  "preferences": {"dietaryPreferences": ["vegetarian"], "activityLevel": "moderate"}
}
```

#### 7.3 Cloud Storage Structure
- Bucket paths:
  - `reports/{uid}/{reportId}/{originalFilename}`
  - `user_uploads/{uid}/{yyyy}/{MM}/{dd}/{filename}`
- Files typically linked from `users/{uid}/reports/{reportId}.filePath`

#### 7.4 Cloud Functions (optional)
- Auth triggers: On user create → seed `users/{uid}` with profile shell
- Firestore triggers:
  - On `users/{uid}/reports/{reportId}` create → run OCR/analysis → write `analysisResults`
  - On `users/{uid}/meal_logs/{logId}` write → compute nutrition/macros if needed
- Scheduled: Daily reminders push, trends aggregation
- HTTP (callable): `diet/getPlan`, `diet/nutritionAnalysis`, `reports/getTrends`
- HTTPS inbound webhook (partners): `/webhooks/partners/lab-results` to ingest signed lab results

#### 7.5 Firestore Indexes (recommended)
- `users/{uid}/meal_logs`: composite index on (`timestamp` desc, `mealType` asc)
- `users/{uid}/glucose_readings`: single-field index on `timestamp` (range queries)
- `foods`: index on `nameLower` (prefix text search) and `tags` (array-contains)

#### 7.6 Security Rules (outline)
- Require authentication for all `users/*` docs and subcollections: `request.auth.uid == resource.id` or `request.auth.uid == uidPathParam`
- `foods/*`: read allow for all; write restricted to admins via custom claims
- `partners/*`: read restricted to admins; writes only by admins
- Webhook endpoint must validate HMAC signature using partner `apiKeyHash`
- Validate field types/ranges (e.g., glucose 40–600 mg/dL, timestamps not in far future)
- Storage: allow users to read/write only their own `reports/{uid}/**` files

#### 7.7 API Endpoints (if using HTTP Cloud Functions)
```
Authentication:
POST /api/auth/login-google           # Prefer client SDK for Google sign-in
POST /api/auth/login-phone            # Start phone sign-in (send OTP)
POST /api/auth/verify-otp             # Verify OTP
POST /api/auth/refresh                # Optional server token refresh

Profile:
GET /api/profile
PUT /api/profile
POST /api/profile/health-assessment

Diet:
GET /api/diet/plan
POST /api/diet/plan/generate          # Generate personalized plan
POST /api/diet/log-meal
GET /api/diet/food-search
GET /api/diet/nutrition-analysis

Reports:
POST /api/reports/upload
GET /api/reports/analysis
GET /api/reports/trends
```

### Security & Privacy

#### 8.1 Data Protection
- End-to-end encryption for sensitive health data
- HIPAA considerations
- Local storage options and secure cloud backups
- Anonymous analytics collection

#### 8.2 Consent Management
- Granular privacy controls; data sharing preferences
- Third-party integration permissions
- Data export and account deletion

### Performance & Scalability

#### 9.1 Performance Targets
- Load main screens < 3s
- API responses < 1s
- Offline capability for core features
- Battery optimization; minimal background processing
- Efficient local storage management

#### 9.2 Scalability
- Cloud-native backend
- CDN for static assets
- Database optimizations for large datasets
- Caching for frequently accessed data

### Development Phases

#### Phase 1: MVP
- Registration and basic profile
- Simple food logging
- Basic glucose tracking
- Essential dashboard
- Core navigation

#### Phase 2: Enhanced
- Personalized diet charts
- Advanced meal planning
- Report upload + basic analysis
- Routine tools
- Improved UI/UX

#### Phase 3: Advanced Analytics
- AI insights
- Comprehensive report analysis
- Wearable integrations
- Community features
- Advanced personalization

#### Phase 4: Platform Expansion
- Provider integrations
- Telemedicine
- Advanced AI recommendations
- Multi-language support
- International food databases

### Testing Strategy

#### 11.1 Types
- Unit, integration, UAT, performance, security

#### 11.2 Beta Program
- Recruit diabetes patients
- Collect usability and accuracy feedback
- Validate medical information with professionals
- Iterate based on feedback

### Compliance & Regulations

#### 12.1 Medical App Compliance
- Medical device regulation considerations
- Clinical accuracy validation
- Disclaimers and limitations
- Professional medical advice integration
- Emergency handling
 - No commerce: the app does not sell products; it provides digital lifestyle tools only

#### 12.2 Data Regulations
- GDPR compliance (EU) and regional laws
- Healthcare data-specific regulations
- Age-appropriate data handling
- Cross-border data transfer compliance

### Conclusion
This specification outlines a phased roadmap to deliver a personalized, accurate, and user-friendly diabetes management app.

#### Next Steps
1. Validate technical feasibility
2. Create wireframes and mockups
3. Set up environment and architecture
4. Begin Phase 1 (MVP)
5. Establish testing and QA protocols

#### Key Success Metrics
- User engagement and retention
- Improved health outcomes
- Recommendation accuracy
- User satisfaction
- Clinical validation