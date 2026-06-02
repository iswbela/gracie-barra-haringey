// Pure HTML parsing utilities — safe to use in Client Components

export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function extractListItems(html: string): string[] {
  const matches = html.match(/<li[^>]*>(.*?)<\/li>/gi) ?? [];
  return matches.map((m) =>
    m
      .replace(/<[^>]+>/g, "")
      .replace(/&[a-z]+;/gi, (e) => {
        const entities: Record<string, string> = {
          "&amp;": "&",
          "&lt;": "<",
          "&gt;": ">",
          "&quot;": '"',
          "&#39;": "'",
          "&nbsp;": " ",
        };
        return entities[e] ?? e;
      })
      .trim()
  );
}
