# QuantumFinix / Indian Developer Community frontend

Next.js App Router frontend using Redux Toolkit 2.x and RTK Query with cookie-based authentication.

## Completed frontend areas

### Public

- Marketing homepage and service pages
- Login, registration, OTP, forgot-password, and reset-password pages
- Public careers directory with search, filters, featured/urgent roles, and pagination
- Public job detail pages
- Authenticated multipart job-application form with profile prefill and duplicate prevention
- Public contact and consultation lead forms

### Candidate account

- Protected profile creation and editing
- Profile/cover images, resume, skills, languages, education, and experience
- Application status, documents, editable application fields, and withdrawal
- Active sessions, password change, logout, and logout-all

### Administrator dashboard

- Live overview metrics
- Full job create/edit/status/delete workflow
- Application list, documents, notes, status updates, emails, and deletion
- Lead list, filters, statistics, assignment, status, priorities, follow-ups, notes, and deletion
- User creation, roles, verification, unlock, and deletion
- Complete administrator profile management for every user
- BullMQ email queue counts, polling, pause/resume, failed-job retry, and removal

## Local development

```bash
cp .env.local.example .env.local
npm install
npm run dev
```

Default local API:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Production / Vercel

Set this server-only variable in Production and Preview:

```env
BACKEND_API_URL=https://your-backend-domain.com/api
```

The browser uses the same-origin `/backend-api` path. `next.config.ts` proxies it to the backend, so authentication cookies do not depend on third-party cookie behavior.

Backend production settings:

```env
NODE_ENV=production
FRONTEND_URL=https://your-production-domain.com
CORS_ORIGINS=https://your-production-domain.com,https://*.vercel.app
AUTH_COOKIE_SAME_SITE=lax
AUTH_COOKIE_DOMAIN=
```

## Commands

```bash
npm run dev
npm run typecheck
npm run lint
npm run build
npm start
```

See `PRODUCTION_AUTH_SETUP.md` for the production cookie checklist.
