const FILE_MARKER = "/__file/";

/** Tina rewrites repo files to assets.tina.io URLs. Those files are already in public/. */
export function repoMedia<T>(value: T): T {
  if (typeof value === "string") {
    if (!value.startsWith("https://assets.tina.io/")) return value;
    const index = value.indexOf(FILE_MARKER);
    if (index === -1) return value;
    const path = value.slice(index + FILE_MARKER.length).split("?")[0];
    return `/${path}` as T;
  }
  if (Array.isArray(value)) return value.map((item) => repoMedia(item)) as T;
  if (value && typeof value === "object") {
    const copy: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) {
      copy[key] = key === "query" ? item : repoMedia(item);
    }
    return copy as T;
  }
  return value;
}
