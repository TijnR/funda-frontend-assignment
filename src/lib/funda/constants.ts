/**
 * How many listings one feed page returns, and therefore one grid page renders.
 *
 * 25 is the Funda feed's hard ceiling and it enforces it silently: asking for more still
 * returns 25 objects, but `AantalPaginas` is computed from the size you asked for, so the
 * pager would promise pages that hold nothing and most of the feed would be unreachable.
 */
export const PAGE_SIZE = 25;
