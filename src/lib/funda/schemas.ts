import { z } from "zod";

const nullableString = z.string().nullable().optional();
const nullableNumber = z.number().nullable().optional();

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

export type RawListingSummary = z.infer<typeof rawListingSummarySchema>;
export type RawListingsResponse = z.infer<typeof rawListingsSuccessSchema>;
