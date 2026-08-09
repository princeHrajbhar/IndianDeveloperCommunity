# QuantumFinix full-stack validation

Validation date: 2026-07-31

## Completed checks

- 244 TypeScript and TSX source files passed TypeScript syntax transpilation.
- 439 internal relative and `@/src/*` imports resolved to source files.
- 78 Next.js App Router pages were detected.
- 208 static internal links and redirects resolve to an App Router page.
- `docker-compose.yml` parses as valid YAML.
- Frontend, backend, and root JSON configuration files parse successfully.
- ZIP archives were integrity-tested after creation.

## Canonical routes

Public careers:

- `/job`
- `/job/[slug]`
- `/job/[slug]/apply`

Administrator workspace:

- `/dashboard/jobs`
- `/dashboard/jobs/new`
- `/dashboard/jobs/[id]`
- `/dashboard/jobs/[id]/edit`
- `/dashboard/applications`
- `/dashboard/applications/[id]`
- `/dashboard/leads`
- `/dashboard/leads/new`
- `/dashboard/leads/[id]`
- `/dashboard/users`
- `/dashboard/users/new`
- `/dashboard/users/[id]`
- `/dashboard/queue`

Candidate applications:

- `/profile/applications`
- `/profile/applications/[id]`
- `/profile/applications/[id]/edit`

Legacy `/careers/*` and `/jobs/*` URLs redirect to `/job/*`.

## Database migration

Run once after deploying the updated backend, or let the included Docker Compose API command run it before the server starts:

```bash
npm run migrate:applications
```

The migration removes the old one-application-per-user unique index and installs the compound `(applicantUserId, jobId)` unique index.

## Dependency-backed build

A full `npm install`, `next build`, and backend `tsc` build could not be completed in this environment because the configured npm registry did not have all required packages cached. Run these commands after extraction:

```bash
cd backend
npm install
npm run build

cd ../frontend
npm install
npm run typecheck
npm run build
```
