import z from "zod";

export const SupportedCantoScheme = z.enum(["image", "video"]);
const CantoScheme = z.enum([
  ...SupportedCantoScheme.options,
  "audio",
  "document",
  "presentation",
  "other",
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

export const DetailedAssetSchema = z
  .object({
    additional: AdditionalSchema,
    approvalStatus: z.string(),
    default: AssetDefaultSchema,
    height: z.string(),
    id: z.string(),
    name: z.string(),
    owner: z.string().nullable(),
    ownerName: z.string().nullable(),
    scheme: CantoScheme,
    size: z.string(),
    smartTags: z.array(z.string()),
    tag: z.array(z.string()),
    time: z.string(),
    url: AssetUrlSchema,
    width: z.string(),
  })
  .superRefine((val, ctx) => {
    if (val.scheme === "video" && !val.url.directUrlPreviewPlay) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Video asset is missing play URL",
      });
    }
  });

export type SupportedCantoAssetScheme = z.infer<typeof SupportedCantoScheme>;
export type CantoAssetScheme = z.infer<typeof CantoScheme>;
export type CantoAssetAdditional = z.infer<typeof AdditionalSchema>;
export type CantoAssetDetailed = z.infer<typeof DetailedAssetSchema>;
export type CantoAssetUrl = z.infer<typeof AssetUrlSchema>;
