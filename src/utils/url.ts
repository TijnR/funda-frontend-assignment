/**
 * Upgrades an http url to https. The Funda feed serves every photo over plain
 * http, which browsers block on an https page.
 */
export function toHttpsUrl(url: string | null | undefined): string | null {
  if (!url) return null;

  return url.startsWith("http://") ? `https://${url.slice("http://".length)}` : url;
}
