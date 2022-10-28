import { getImageFields } from "@/lib/api/fragments/image";

export const slideshowFragment = `
  fragment slideshowFragment on slideshows_slideshow_Entry {
      id
      uri
      title
      language
      localized {
        uri
        language
      }
      date: dateUpdated
      description: richTextDescription
      slug
      typeHandle
      image: representativeAssetVariant {
        ... on assetVariants_Asset {
          ${getImageFields("crop", 600, 400)}
        }
      }
    }
`;
