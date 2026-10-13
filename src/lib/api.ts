export const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ApiResult<T> = { ok: boolean; status: number; data: T | null };

export async function api<T = unknown>(
  path: string,
  init: RequestInit = {}
): Promise<ApiResult<T>> {
  if (!API_URL) return { ok: false, status: 0, data: null };
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...init,
      credentials: "include",
      headers: { "Content-Type": "application/json", ...(init.headers ?? {}) },
    });
    const data = (await res.json().catch(() => null)) as T | null;
    return { ok: res.ok, status: res.status, data };
  } catch {
    return { ok: false, status: 0, data: null };
  }
}