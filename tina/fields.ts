import type { TinaField } from "tinacms";

export const ICONS = [
  "home",
  "pin",
  "trend",
  "layers",
  "bag",
  "award",
  "clock",
  "users",
  "megaphone",
  "globe",
  "bell",
  "trendingUp",
  "compass",
  "target",
  "search",
  "chat",
  "rocket",
  "clipboard",
  "envelope",
  "calendar",
  "lightbulb",
  "building",
  "cart",
  "car",
  "star",
  "handshake",
] as const;

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function str(name: string, label: string, description?: string): TinaField {
  return {
    type: "string",
    name,
    label,
    description: description ?? `The ${label.toLowerCase()} visitors see on the site.`,
  };
}

export function img(name: string, label: string, description?: string): TinaField {
  return {
    type: "image",
    name,
    label,
    description: description ?? `Choose ${label.toLowerCase()} from the media library.`,
  };
}

export function bool(name: string, label: string, description?: string): TinaField {
  return {
    type: "boolean",
    name,
    label,
    description: description ?? `Turn ${label.toLowerCase()} on or off.`,
  };
}

export function num(name: string, label: string, description?: string): TinaField {
  return {
    type: "number",
    name,
    label,
    description: description ?? `The ${label.toLowerCase()}.`,
  };
}

export function strings(name: string, label: string, description?: string): TinaField {
  return {
    type: "string",
    name,
    label,
    list: true,
    description: description ?? `Add, remove, or reorder ${label.toLowerCase()}.`,
  };
}

export function iconField(name = "icon", label = "Icon"): TinaField {
  return {
    type: "string",
    name,
    label,
    description: "Pick one of the site's icons. The picture stays the same; only the mark changes.",
    options: ICONS.map((value) => ({ value, label: value })),
  };
}

export function link(name = "href", label = "Link"): TinaField {
  return str(name, label, "A page on this site, like /contact, or a full https link.");
}

export function named(labelKey = "label") {
  return {
    itemProps: (item: Record<string, string> | undefined) => ({
      label: item?.[labelKey] || item?.name || item?.title || item?.q || "Item",
    }),
  };
}
