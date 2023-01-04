import { fullBaseFields } from "@/lib/api/fragments/shared";
import { getImageFields } from "@/lib/api/fragments/image";

export const slideshowFragment = `
  fragment slideshowFragment on slideshows_slideshow_Entry {
      ${fullBaseFields}
      date: dateUpdated
      description: richTextDescription
      slug
      image: representativeAssetVariant {
        ... on assetVariants_Asset {
          ${getImageFields("crop", 600, 400)}
        }
      }
    }
`;
