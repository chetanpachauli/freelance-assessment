# Appointment Manager (MERN)

Small appointment management app: React (Vite) + Tailwind CSS on the front, Node.js/Express + MongoDB (Mongoose) on the back.

> **AI-assistance disclosure:** This code was generated with AI assistance (Claude) and no starter template was used. Review and be ready to explain it before submitting.

## Features
**Completed:** list appointments (customer, service, date/time, status) · add appointment with inline + server validation · change status · filter by All/Pending/Confirmed/Cancelled · case-insensitive customer-name search (debounced, server-side) · seed data (Alex Morgan, Jamie Lee, Taylor Smith) · responsive layout · MongoDB persistence.

**Known limitations**
- No authentication, edit/delete or pagination (out of the brief's scope).
- Dates are entered in the browser's local timezone and stored as UTC; seed times are interpreted in the server's timezone.
- No frontend automated tests; no automated DB-backed API tests.

## Folder structure
```
appointment-manager/
├── server/
│   ├── src/
│   │   ├── config/           # env + DB connection
│   │   ├── constants/        # statuses, HTTP codes, messages (no magic strings)
│   │   ├── models/           # Mongoose schema (enum + indexes)
│   │   ├── validations/      # Zod schemas
│   │   ├── repositories/     # only layer that talks to Mongoose
│   │   ├── services/         # business rules (filter building, not-found, seeding)
│   │   ├── controllers/      # HTTP in/out only
│   │   ├── routes/           # URL -> validation -> controller
│   │   ├── middlewares/      # validate, notFound, global error handler
│   │   ├── utils/            # AppError, asyncHandler, response, regex
│   │   ├── seed/             # seed data + `npm run seed`
│   │   ├── app.js            # Express app factory (testable)
│   │   └── server.js         # bootstrap + graceful shutdown
│   └── tests/
└── client/
    └── src/
        ├── constants/        # statuses, messages, styles map
        ├── services/         # httpClient (fetch wrapper) + appointmentApi
        ├── hooks/            # useAppointments (composes filters + query), useAppointmentForm
        ├── utils/            # validation, date format, query string
        ├── components/ui/    # Button, StatusBadge, FormFields, Spinner, ErrorAlert
        ├── components/appointments/  # Card, List, Form, FilterBar, SearchInput, StatusSelect
        └── pages/DashboardPage.jsx
```

## Local setup
Requires Node 20+ and MongoDB (local service or MongoDB Atlas free cloud database).

### Quick Start (Root Directory)
```bash
# 1. Install root, backend, and frontend dependencies
npm run install:all

# 2. Setup environment files
cp server/.env.example server/.env    # Edit MONGODB_URI if using Atlas
cp client/.env.example client/.env

# 3. Start both Backend & Frontend concurrently with a single command
npm start
# or: npm run dev
```
- Frontend: [http://localhost:5173](http://localhost:5173) (proxies `/api` to port 5000)
- Backend API: [http://localhost:5000](http://localhost:5000)

### Or Run Individually
```bash
# Terminal 1: Backend API
cd server
npm install
npm run dev                 # http://localhost:5000 (seeds 3 rows when DB is empty)

# Terminal 2: Frontend UI
cd client
npm install
npm run dev                 # http://localhost:5173
```
Reset data any time: `npm run seed` (or `cd server && npm run seed`).
Run automated API tests: `npm test` (or `cd server && npm test`).

### Environment files
`server/.env.example`: `NODE_ENV`, `PORT`, `MONGODB_URI`, `CLIENT_ORIGIN`, `AUTO_SEED`.
`client/.env.example`: `VITE_API_BASE_URL`. Never commit real `.env` files (already git-ignored).

## API notes
Base path `/api`. Success: `{ success: true, data }`. Error: `{ success: false, message, errors? }` where `errors` maps field -> message.

| Method | Path | Description |
|---|---|---|
| GET | `/health` | Liveness check |
| GET | `/appointments?status=&search=` | List, sorted by date. `status` = All/Pending/Confirmed/Cancelled, `search` = case-insensitive name match |
| POST | `/appointments` | Body: `customerName`, `service`, `scheduledAt` (ISO), `status?` (default Pending). 201 / 422 |
| PATCH | `/appointments/:id/status` | Body: `{ status }`. 200 / 404 / 422 |

## Tests
**Automated (`cd server && npm test`, 14 tests):** Zod schema rules (required fields, trimming, invalid date/status, defaults) · list-filter builder incl. case-insensitive + regex-escaped search · HTTP layer without a database (health, 404, 422 field errors, malformed id, invalid filter, malformed JSON). Client production build (`npm run build`) compiles cleanly.

**Manual checklist (run before demo and tick what you actually verified):**
- [ ] Seed rows appear after first start
- [ ] Add with empty form shows 3 inline errors; valid add appears in list
- [ ] Change status from the dropdown; badge updates
- [ ] Each filter tab shows the right rows
- [ ] Search "alex", "ALEX", "lee" works; clearing restores list
- [ ] Refresh page: data persists
- [ ] Stop the API: list shows error with Retry
- [ ] 375px mobile width is usable

## Technical decision: layered backend + a single data hook on the client
Controllers only translate HTTP, services hold rules, and **only the repository imports Mongoose**. Validation is a middleware in front of controllers, so invalid input never reaches business code, and all errors flow to one global handler with a consistent JSON shape. This keeps each function small and lets the storage layer be swapped or mocked without touching controllers. On the client, `useAppointments` is the single place that owns filters, fetching and mutations; components are presentational. After every mutation the list is re-fetched, trading one extra request for always-correct results under the active filter/search (no stale optimistic state).
