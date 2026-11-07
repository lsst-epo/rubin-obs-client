import { print } from "graphql";
import { fullBaseFields } from "@/lib/api/fragments/shared";
import { SlideshowDialogFragmentDoc } from "@/gql/graphql";

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

export const slideshowDialogFragment = print(SlideshowDialogFragmentDoc);

export const slideshowItemsFragment = `
  fragment slideshowItemsFragment on slideshows_slideshow_Entry {
    items: slideshowItems {
      ... on slideshowItems_slide_BlockType {
        id
        title: slideTitle
        description: slideContent
        teaser: slidePreviewContent
        image: slideAsset {
          ... on assetVariants_Asset {
            altText
            width
            height
            url @transform(mode: "fit", width: 1000)
          }
        }
      }
    }
  }
`;
