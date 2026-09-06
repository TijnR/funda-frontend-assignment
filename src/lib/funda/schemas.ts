import { z } from "zod";

const nullableString = z.string().nullable().optional();
const nullableNumber = z.number().nullable().optional();

export const rawFundaImageSchema = z
  .object({
    Height: nullableNumber,
    Url: nullableString,
    UrlSecure: nullableString,
    Width: nullableNumber,
  })
  .strip();

export const rawFundaMediaSchema = z
  .object({
    Categorie: nullableNumber,
    ContentType: nullableNumber,
    IndexNumber: nullableNumber,
    Omschrijving: nullableString,
    MediaItems: z.array(rawFundaImageSchema).nullable().optional(),
  })
  .strip();

export const rawFundaFeatureSchema = z
  .object({
    Naam: nullableString,
    Waarde: nullableString,
  })
  .strip();

export const rawFundaFeatureGroupSchema = z
  .object({
    Kenmerken: z.array(rawFundaFeatureSchema).nullable().optional(),
    Titel: nullableString,
  })
  .strip();

export const rawListingSummarySchema = z
  .object({
    AantalKamers: nullableNumber,
    Adres: nullableString,
    FotoLargest: nullableString,
    Id: nullableString,
    Koopprijs: nullableNumber,
    Perceeloppervlakte: nullableNumber,
    Postcode: nullableString,
    Woonoppervlakte: nullableNumber,
    Woonplaats: nullableString,
  })
  .strip();

const rawValidationFailureSchema = z
  .object({
    ValidationFailed: z.literal(true),
    ValidationReport: nullableString,
  })
  .strip();

const rawListingsSuccessSchema = z
  .object({
    Objects: z.array(rawListingSummarySchema),
    Paging: z
      .object({
        AantalPaginas: z.number(),
        HuidigePagina: z.number(),
      })
      .strip(),
    TotaalAantalObjecten: z.number(),
    ValidationFailed: z.literal(false).nullable().optional(),
    ValidationReport: nullableString,
  })
  .strip()
  .superRefine((response, context) => {
    response.Objects.forEach((listing, index) => {
      for (const field of ["Id", "Adres", "Woonplaats"] as const) {
        if (!listing[field]?.trim()) {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            message: `${field} is required for a listing summary.`,
            path: ["Objects", index, field],
          });
        }
      }
    });
  });

export const rawListingsResponseSchema = z.union([
  rawValidationFailureSchema,
  rawListingsSuccessSchema,
]);

const rawListingDetailSuccessSchema = z
  .object({
    AantalKamers: nullableNumber,
    AantalSlaapkamers: nullableNumber,
    Adres: z.string().trim().min(1),
    Bouwjaar: z.union([z.string(), z.number()]).nullable().optional(),
    Energielabel: z
      .object({
        Label: nullableString,
      })
      .strip()
      .nullable()
      .optional(),
    Kenmerken: z.array(rawFundaFeatureGroupSchema).nullable().optional(),
    KoopPrijs: nullableNumber,
    Koopprijs: nullableNumber,
    Makelaar: nullableString,
    Media: z.array(rawFundaMediaSchema).nullable().optional(),
    PerceelOppervlakte: nullableNumber,
    Plaats: z.string().trim().min(1),
    Postcode: nullableString,
    URL: nullableString,
    ValidationFailed: z.literal(false).nullable().optional(),
    ValidationReport: nullableString,
    VolledigeOmschrijving: nullableString,
    WGS84_X: nullableNumber,
    WGS84_Y: nullableNumber,
    WoonOppervlakte: nullableNumber,
  })
  .strip();

export const rawListingDetailSchema = z.union([
  rawValidationFailureSchema,
  rawListingDetailSuccessSchema,
]);

export type RawFundaFeatureGroup = z.infer<typeof rawFundaFeatureGroupSchema>;
export type RawFundaImage = z.infer<typeof rawFundaImageSchema>;
export type RawFundaMedia = z.infer<typeof rawFundaMediaSchema>;
export type RawListingDetail = z.infer<typeof rawListingDetailSuccessSchema>;
export type RawListingSummary = z.infer<typeof rawListingSummarySchema>;
export type RawListingsResponse = z.infer<typeof rawListingsSuccessSchema>;
