import { parseMarkdown } from "@tanstack/markdown/parser";
import { parse } from "yaml";

const files = import.meta.glob("./content/wiki/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

export const posts = Object.entries(files)
  .map(([path, source]) => {
    const document = parseMarkdown(source as string);
    const fields = parse(document.frontmatter ?? "") as {
      title: string;
      date: string;
      aliases?: string[];
    };

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
