import { getImageFields } from "@/lib/api/fragments/image";

export const galleryItemFragment = `
  fragment galleryItemFragment on galleryItems_galleryItem_Entry {
      id
      slug
      title
      typeHandle
      uri
      language
      date: dateUpdated
      description: richTextDescription
      image: representativeAssetVariant {
        ... on assetVariants_Asset {
          ${getImageFields("crop", 600, 400)}
        }
      }
      galleryItemCategory {
        id
        slug
        title
      }
      galleryItemTags {
        id
        slug
        title
      }
      localized {
        uri
        language
      }
    }
`;
