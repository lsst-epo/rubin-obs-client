import { fullBaseFields } from "@/lib/api/fragments/shared";

export const slideshowFragment = `
  fragment slideshowFragment on slideshows_slideshow_Entry {
      ${fullBaseFields}
      date: dateUpdated
      description: richTextDescription
      slug
      image: representativeAssetVariant {
        ... on assetVariants_Asset {
                  altText
                  width
                  height
                  url @transform(mode: "crop", width: 600, height: 400)
        }
      }
    }
`;
