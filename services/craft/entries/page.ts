import { graphql } from "@/gql";

export const PagePreviewFragment = graphql(`
  fragment PagePreview on pages_pages_Entry {
    id
    uri
    title
    language
    typeHandle
    featuredImage: cantoAssetSingle {
      ...CantoAssetMetadata
    }
    localized {
      uri
      language
    }
    date: dateUpdated
    description
    image: hero {
      ... on heroes_Asset {
        altText
        width
        height
        url @transform(mode: "crop", width: 900, height: 550)
      }
    }
    sidebarAssets {
      ... on sidebarAssets_textLink_BlockType {
        text
        textLink {
          url
        }
      }
    }
  }
`);
