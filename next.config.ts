import type { NextConfig } from "next";

function getBackendApiUrl(): string | null {
  const explicitBackendUrl = process.env.BACKEND_API_URL?.trim();
  const legacyPublicUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (process.env.VERCEL === "1" && !explicitBackendUrl) {
    throw new Error(
      "BACKEND_API_URL must be configured in Vercel for Production and Preview deployments",
    );
  }

  const configured =
    explicitBackendUrl ||
    (legacyPublicUrl?.startsWith("http://") ||
    legacyPublicUrl?.startsWith("https://")
      ? legacyPublicUrl
      : undefined);

  if (!configured) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "BACKEND_API_URL is required for production builds, for example https://api.example.com/api",
      );
    }
    return null;
  }

  const parsed = new URL(configured);
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    throw new Error("BACKEND_API_URL must use http or https");
  }

  return configured.replace(/\/+$/, "");
}

const backendApiUrl = getBackendApiUrl();

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "localhost" },
      { protocol: "http", hostname: "127.0.0.1" },
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      { source: "/dashboard/applications", destination: "/dashboard/application", permanent: true },
      { source: "/dashboard/applications/:id", destination: "/dashboard/application/:id", permanent: true },
      { source: "/dashboard/jobs", destination: "/dashboard/job", permanent: true },
      { source: "/dashboard/jobs/new", destination: "/dashboard/job/add", permanent: true },
      { source: "/dashboard/jobs/:id/edit", destination: "/dashboard/job/:id/edit", permanent: true },
      { source: "/dashboard/jobs/:id", destination: "/dashboard/job/:id", permanent: true },
      { source: "/dashboard/leads", destination: "/dashboard/lead", permanent: true },
      { source: "/dashboard/leads/new", destination: "/dashboard/lead/add", permanent: true },
      { source: "/dashboard/leads/:id", destination: "/dashboard/lead/:id", permanent: true },
      { source: "/dashboard/users", destination: "/dashboard/user", permanent: true },
      { source: "/dashboard/users/new", destination: "/dashboard/user/add", permanent: true },
      { source: "/dashboard/users/:id", destination: "/dashboard/user/:id", permanent: true },
      { source: "/jobs", destination: "/job", permanent: true },
      { source: "/jobs/:slug", destination: "/job/:slug", permanent: true },
      { source: "/careers", destination: "/job", permanent: true },
      { source: "/careers/:slug/apply", destination: "/job/:slug/apply", permanent: true },
      { source: "/careers/:slug", destination: "/job/:slug", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          { key: "Content-Security-Policy", value: "base-uri 'self'; object-src 'none'; frame-ancestors 'none'" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
        ],
      },
    ];
  },
  async rewrites() {
    if (!backendApiUrl) return [];

    return [
      {
        source: "/backend-api/:path*",
        destination: `${backendApiUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
