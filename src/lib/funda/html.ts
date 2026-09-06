/**
 * Funda returns feature values as fragments of its own website: HTML tags,
 * named/numeric entities, and `<{...}>` placeholders that its front end
 * resolves at render time. We render them as plain text instead.
 */

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  apos: "'",
  bull: "•",
  deg: "°",
  euro: "€",
  gt: ">",
  hellip: "…",
  lt: "<",
  mdash: "—",
  middot: "·",
  nbsp: " ",
  ndash: "–",
  quot: '"',
  sup2: "²",
  sup3: "³",
};

const PLACEHOLDER_PATTERN = /<\{([^}]*)\}>/gu;
const TAG_PATTERN = /<[^>]*>/gu;
const ENTITY_PATTERN = /&(#x[0-9a-f]+|#\d+|[a-z][a-z0-9]*);/giu;

/** `<{kosten koper|kort}>` renders as `kosten koper`. */
function resolvePlaceholders(value: string): string {
  return value.replace(PLACEHOLDER_PATTERN, (_match, inner: string) => inner.split("|")[0] ?? "");
}

export function decodeHtmlEntities(value: string): string {
  return value.replace(ENTITY_PATTERN, (match, entity: string) => {
    if (entity.startsWith("#")) {
      const isHex = entity[1] === "x" || entity[1] === "X";
      const codePoint = Number.parseInt(isHex ? entity.slice(2) : entity.slice(1), isHex ? 16 : 10);
      if (!Number.isFinite(codePoint) || codePoint <= 0 || codePoint > 0x10ffff) return match;
      return String.fromCodePoint(codePoint);
    }

    return NAMED_ENTITIES[entity.toLowerCase()] ?? match;
  });
}

/**
 * Strips markup before decoding entities, so an escaped `&lt;script&gt;` stays
 * literal text instead of turning into a tag.
 */
export function toPlainText(value: string | null | undefined): string {
  if (!value) return "";

  return decodeHtmlEntities(resolvePlaceholders(value).replace(TAG_PATTERN, " "))
    .replace(/\s+/gu, " ")
    .trim();
}
