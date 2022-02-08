import { getImageFields } from "@/lib/api/fragments/image";

export const slideshowFragment = `
  fragment slideshowFragment on slideshows_slideshow_Entry {
      id
      date: dateUpdated
      description: richTextDescription
      slug
      title
      uri
      language
      typeHandle
      image: representativeAssetVariant {
        ... on assetVariants_Asset {
          ${getImageFields("crop", 600, 400)}
        }
      }
    }
`;
