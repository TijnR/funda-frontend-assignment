const euroFormatter = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const integerFormatter = new Intl.NumberFormat("nl-NL", {
  maximumFractionDigits: 0,
});

export function formatPrice(price: number | null): string {
  return price == null ? "Prijs op aanvraag" : `${euroFormatter.format(price)} k.k.`;
}

export function formatArea(area: number): string {
  return `${integerFormatter.format(area)} m²`;
}

export function parsePage(value: string | string[] | undefined): number {
  const candidate = Array.isArray(value) ? value[0] : value;
  if (!candidate || !/^\d+$/.test(candidate)) return 1;

  const page = Number(candidate);
  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}
