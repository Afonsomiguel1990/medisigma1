import TurndownService from "turndown";

const REMOVED_ELEMENTS = [
  "button",
  "canvas",
  "footer",
  "form",
  "header",
  "iframe",
  "input",
  "label",
  "nav",
  "noscript",
  "option",
  "script",
  "select",
  "style",
  "textarea",
] as const;

function extractTitle(html: string) {
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "";
  return title
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

export function htmlToMarkdown(html: string) {
  const turndown = new TurndownService({
    bulletListMarker: "-",
    codeBlockStyle: "fenced",
    emDelimiter: "_",
    headingStyle: "atx",
    strongDelimiter: "**",
  });

  turndown.remove([...REMOVED_ELEMENTS]);
  turndown.addRule("agent-ignored-content", {
    filter: (node) =>
      node.nodeName.toLowerCase() === "svg" ||
      (node.nodeType === 1 &&
        (node as Element).hasAttribute("data-agent-ignore")),
    replacement: () => "",
  });

  let markdown = turndown.turndown(html).trim();
  const title = extractTitle(html);

  if (title && !/^#\s+/m.test(markdown)) {
    markdown = `# ${title}\n\n${markdown}`.trim();
  }

  return `${markdown.replace(/\n{3,}/g, "\n\n")}\n`;
}
