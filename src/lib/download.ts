import { API_URL } from "@/src/lib/env";

export async function downloadAdminFile(
  path: string,
  filename: string,
  params?: Record<string, string | number | boolean | undefined>,
): Promise<void> {
  const query = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== "") query.set(key, String(value));
  });
  const url = `${API_URL}${path}${query.size ? `?${query.toString()}` : ""}`;
  const response = await fetch(url, {
    credentials: "include",
    cache: "no-store",
    headers: {
      Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
  if (!response.ok) {
    const body = await response.json().catch(() => null) as { message?: string } | null;
    throw new Error(body?.message || `Export failed (${response.status})`);
  }
  const blob = await response.blob();
  const contentDisposition = response.headers.get("content-disposition") || "";
  const serverName = /filename="?([^";]+)"?/i.exec(contentDisposition)?.[1];
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = serverName || filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(objectUrl);
}
