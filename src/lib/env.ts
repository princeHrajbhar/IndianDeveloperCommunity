const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

const defaultApiUrl =
  process.env.NODE_ENV === "production"
    ? "/backend-api"
    : "http://localhost:5000/api";

// Production deliberately uses a same-origin path. This prevents auth cookies
// from depending on third-party cookie behavior across Vercel and API domains.
export const API_URL = (
  process.env.NODE_ENV === "production"
    ? "/backend-api"
    : configuredApiUrl || defaultApiUrl
).replace(/\/+$/, "");
