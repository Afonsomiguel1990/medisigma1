export const HTML_MEDIA_TYPE = "text/html" as const;
export const MARKDOWN_MEDIA_TYPE = "text/markdown" as const;

export type PublicRepresentation =
  | typeof HTML_MEDIA_TYPE
  | typeof MARKDOWN_MEDIA_TYPE;

type MediaRange = {
  type: string;
  subtype: string;
  quality: number;
  order: number;
  specificity: number;
};

type RepresentationScore = {
  representation: PublicRepresentation;
  quality: number;
  specificity: number;
  order: number;
};

function splitHeaderValues(value: string) {
  const values: string[] = [];
  let current = "";
  let quoted = false;
  let escaped = false;

  for (const character of value) {
    if (escaped) {
      current += character;
      escaped = false;
      continue;
    }

    if (character === "\\" && quoted) {
      current += character;
      escaped = true;
      continue;
    }

    if (character === '"') {
      quoted = !quoted;
      current += character;
      continue;
    }

    if (character === "," && !quoted) {
      values.push(current);
      current = "";
      continue;
    }

    current += character;
  }

  values.push(current);
  return values;
}

function parseQuality(value: string) {
  const normalized = value.trim().replace(/^"|"$/g, "");

  if (!/^(?:0(?:\.\d{0,3})?|1(?:\.0{0,3})?)$/.test(normalized)) {
    return 0;
  }

  const quality = Number(normalized);
  return Number.isFinite(quality) ? quality : 0;
}

export function parseAcceptHeader(value: string): MediaRange[] {
  return splitHeaderValues(value)
    .map((entry, order): MediaRange | null => {
      const [mediaType = "", ...parameters] = entry.split(";");
      const [rawType, rawSubtype, ...extraParts] = mediaType
        .trim()
        .toLowerCase()
        .split("/");

      if (
        !rawType ||
        !rawSubtype ||
        extraParts.length > 0 ||
        (rawType === "*" && rawSubtype !== "*")
      ) {
        return null;
      }

      let quality = 1;
      for (const parameter of parameters) {
        const separator = parameter.indexOf("=");
        if (separator === -1) continue;

        const name = parameter.slice(0, separator).trim().toLowerCase();
        if (name === "q") {
          quality = parseQuality(parameter.slice(separator + 1));
          break;
        }
      }

      const specificity = rawType === "*" ? 0 : rawSubtype === "*" ? 1 : 2;

      return {
        type: rawType,
        subtype: rawSubtype,
        quality,
        order,
        specificity,
      };
    })
    .filter((range): range is MediaRange => range !== null);
}

function scoreRepresentation(
  representation: PublicRepresentation,
  ranges: MediaRange[],
): RepresentationScore | null {
  const [type, subtype] = representation.split("/");
  const matches = ranges.filter(
    (range) =>
      (range.type === "*" || range.type === type) &&
      (range.subtype === "*" || range.subtype === subtype),
  );

  if (matches.length === 0) return null;

  matches.sort(
    (left, right) =>
      right.specificity - left.specificity || left.order - right.order,
  );

  const match = matches[0];
  return {
    representation,
    quality: match.quality,
    specificity: match.specificity,
    order: match.order,
  };
}

export function negotiatePublicRepresentation(
  acceptHeader: string | null,
): PublicRepresentation | null {
  if (!acceptHeader?.trim()) return HTML_MEDIA_TYPE;

  const ranges = parseAcceptHeader(acceptHeader);
  if (ranges.length === 0) return null;

  const scores = [HTML_MEDIA_TYPE, MARKDOWN_MEDIA_TYPE]
    .map((representation) => scoreRepresentation(representation, ranges))
    .filter(
      (score): score is RepresentationScore =>
        score !== null && score.quality > 0,
    );

  if (scores.length === 0) return null;

  scores.sort((left, right) => {
    const preference =
      left.representation === HTML_MEDIA_TYPE
        ? -1
        : right.representation === HTML_MEDIA_TYPE
          ? 1
          : 0;

    return (
      right.quality - left.quality ||
      right.specificity - left.specificity ||
      left.order - right.order ||
      preference
    );
  });

  return scores[0].representation;
}

export function appendVaryAccept(headers: Headers) {
  const values = (headers.get("Vary") || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  if (!values.some((value) => value.toLowerCase() === "accept")) {
    values.push("Accept");
  }

  headers.set("Vary", values.join(", "));
  return headers;
}
