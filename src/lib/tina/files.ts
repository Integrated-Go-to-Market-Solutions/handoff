import fs from "node:fs";
import path from "node:path";

const root = path.join(process.cwd(), "content");

export function readDoc<T>(relative: string): T {
  return JSON.parse(fs.readFileSync(path.join(root, relative), "utf8")) as T;
}

export function listDocs<T>(dir: string): { slug: string; data: T }[] {
  const folder = path.join(root, dir);
  return fs
    .readdirSync(folder)
    .filter((file) => file.endsWith(".json"))
    .map((file) => ({
      slug: file.replace(/\.json$/, ""),
      data: JSON.parse(fs.readFileSync(path.join(folder, file), "utf8")) as T,
    }));
}

export function tinaDoc<T>(key: string, relative: string, data: T) {
  const slug = relative.replace(/\.json$/, "").split("/").pop() ?? "";
  return {
    data: { [key]: { ...data, _sys: { filename: slug } } },
    query: "",
    variables: { relativePath: relative },
  };
}

export function tinaList<T>(key: string, dir: string) {
  return {
    data: {
      [key]: {
        edges: listDocs<T>(dir).map(({ slug, data }) => ({
          node: { ...data, _sys: { filename: slug } },
        })),
      },
    },
    query: "",
    variables: {},
  };
}
