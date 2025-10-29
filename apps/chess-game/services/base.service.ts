// services/base.service.ts
export class BaseService {
  protected async request<T>(
    url: string,
    options?: RequestInit
  ): Promise<T> {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }

    return (await res.json()) as T;
  }
}
