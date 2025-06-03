import z from "zod";

export const UnsupportedCantoScheme = z.enum([
  "audio",
  "presentation",
  "other",
]);
export const SupportedCantoScheme = z.enum(["image", "video", "document"]);
export const CantoScheme = z.enum([
  ...SupportedCantoScheme.options,
  ...UnsupportedCantoScheme.options,
]);
const AdditionalSchema = z.object({
  AltTextEN: z.string().nullable(),
  AltTextES: z.string().nullable(),
  CaptionEN: z.string().nullable(),
  CaptionES: z.string().nullable(),
  Credit: z.string().nullable(),
  TitleEN: z.string().nullable(),
  TitleES: z.string().nullable(),
});
const AssetDefaultSchema = z.object({
  ContentType: z.string(),
  DateCreated: z.string(),
  DateModified: z.string(),
  DateUploaded: z.string(),
  Size: z.string(),
});
const AssetUrlSchema = z.object({
  directUrlOriginal: z.string().url(),
  directUrlPreview: z.string().url(),
  directUrlPreviewPlay: z.string().url().nullable(),
});

export const BreadcrumbAssetSchema = z.object({
  additional: z.object({
    TitleEN: z.string().nullable(),
    TitleES: z.string().nullable(),
  }),
  id: z.string(),
  name: z.string(),
});

export const MetadataAssetSchema = z.object({
  additional: AdditionalSchema,
  height: z.coerce.number(),
  id: z.string(),
  name: z.string(),
  scheme: CantoScheme,
  url: AssetUrlSchema,
  width: z.coerce.number(),
});
export const MetadataVideoSchema = MetadataAssetSchema.extend({
  scheme: z.literal("video"),
  default: z.object({
    DateUploaded: z.string(),
  }),
  metadata: z.object({
    MIMEType: z.string(),
  }),
});

export const DetailedAssetSchema = z
  .object({
    additional: AdditionalSchema,
    approvalStatus: z.string(),
    default: AssetDefaultSchema,
    height: z.coerce.number(),
    id: z.string(),
    name: z.string(),
    owner: z.string().nullable(),
    ownerName: z.string().nullable(),
    scheme: SupportedCantoScheme,
    size: z.string(),
    smartTags: z.array(z.string()).nullable(),
    tag: z.array(z.string()).nullable(),
    time: z.string(),
    url: AssetUrlSchema,
    width: z.coerce.number(),
  })
  .superRefine((val, ctx) => {
    if (val.scheme === "video" && !val.url.directUrlPreviewPlay) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Video asset is missing play URL",
      });
    }
  });

const limit = 30;

export const GalleryFilterSchema = z
  .object({
    sort: z.enum(["asc", "desc"]).catch("desc").default("desc"),
    page: z.coerce.number().min(1).catch(1).default(1),
    limit: z.coerce.number().min(limit).max(limit).catch(limit).default(limit),
    tag: z
      .array(z.string())
      .optional()
      .catch(({ input }) => {
        if (typeof input === "string" && input !== "") {
          return [input];
        }

        return [];
      })
      .transform((items) => {
        const set = new Set(items);

        return Array.from(set);
      }),
    search: z.string().optional(),
    type: z
      .array(SupportedCantoScheme)
      .optional()
      .catch(({ input }) => {
        if (typeof input === "string" && input !== "") {
          const { data, error } = SupportedCantoScheme.safeParse(input);

          if (data && !error) {
            return [input];
          }
        }

        return [];
      })
      .transform((items) => {
        const set = new Set(items);

        return Array.from(set);
      }),
  })
  .default({});

export type SupportedCantoAssetScheme = z.infer<typeof SupportedCantoScheme>;
export type CantoAssetScheme = z.infer<typeof CantoScheme>;
export type CantoAssetAdditional = z.infer<typeof AdditionalSchema>;
export type CantoAssetDetailed = z.infer<typeof DetailedAssetSchema>;
export type CantoAssetUrl = z.infer<typeof AssetUrlSchema>;
export type CantoAssetMetadata = z.infer<typeof MetadataAssetSchema>;
export type CantoVideoMetadata = z.infer<typeof MetadataVideoSchema>;
export type GalleryDataFilters = z.infer<typeof GalleryFilterSchema>;
