import { parseMarkdown } from "@tanstack/markdown/parser";

const files = import.meta.glob("./content/wiki/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

export const posts = Object.entries(files)
  .map(([path, source]) => {
    const document = parseMarkdown(source as string);
    const fields = Object.fromEntries(
      (document.frontmatter ?? "").split("\n").map((line) => {
        const i = line.indexOf(":");
        return [line.slice(0, i).trim(), line.slice(i + 1).trim()];
      }),
    );

    if (!fields.title || !/^\d{4}-\d{2}-\d{2}$/.test(fields.date ?? ""))
      throw new Error(`Invalid wiki frontmatter: ${path}`);

    return {
      id: path.slice(path.lastIndexOf("/") + 1).replace(/\.md$/, ""),
      title: fields.title,
      date: fields.date,
      document,
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));
