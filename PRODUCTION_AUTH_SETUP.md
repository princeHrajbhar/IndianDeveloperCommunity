# Production routing and authentication setup

## Frontend (Vercel)

Set this Vercel environment variable for Production and Preview deployments:

```env
BACKEND_API_URL=https://your-backend-domain.com/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=1234567890-example.apps.googleusercontent.com
```

Create a Google OAuth 2.0 **Web application** client and add the exact production frontend origin under Authorized JavaScript origins. Set the same client ID as `GOOGLE_CLIENT_ID` on the backend.

The browser calls `/backend-api/*`. `next.config.ts` rewrites that same-origin path to the deployed backend. Do not set a cross-origin `NEXT_PUBLIC_API_URL` in production; the production client intentionally uses `/backend-api`.

## Backend cookie settings

Use HTTPS and these values:

```env
NODE_ENV=production
AUTH_COOKIE_SAME_SITE=lax
AUTH_COOKIE_DOMAIN=
FRONTEND_URL=https://your-production-domain.vercel.app
```

Keep `AUTH_COOKIE_DOMAIN` unset. The cookie must be stored against the Vercel hostname returned by the same-origin proxy.

The backend should continue setting both cookies with `httpOnly: true`, `secure: true` in production, `sameSite: "lax"`, and `path: "/"`.

## Public and protected routes

Public routes render without checking or redirecting to the account area:

- `/`
- `/services` and service detail pages
- `/ai-solutions`
- `/case-studies`
- `/about`
- `/insights`
- `/login`, `/register`, `/verify-otp`, `/forgot-password`, `/reset-password`

Protected routes remain behind `RequireAuth`:

- `/profile/*`

The main public navbar shows **Login** for guests and **My Profile** after `/auth/me` confirms a valid session.
