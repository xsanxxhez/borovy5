export async function api(endpoint: string, options: RequestInit = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  
  const res = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Network error" }));
    throw new Error(error.message || "API Error");
  }

  return res.json();
}
