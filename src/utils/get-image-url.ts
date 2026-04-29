export const getImageUrl = (path: string | null | undefined): string => {
  if (!path) return "";

  if (path.startsWith("http")) return path;

  const apiBase = (import.meta.env.VITE_API_BASE_URL as string) ?? "";
  const normalizedBase = apiBase.endsWith("/") ? apiBase.slice(0, -1) : apiBase;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${normalizedBase}${cleanPath}`;
};
