import { graphql } from "@/gql";

const RubinBasicsPostQuery = graphql(`
  query getRubinBasicsEntry(
    $section: [String]
    $type: [String]
    $site: [String]
    $uri: [String]
  ) {
    entry(section: $section, type: $type, site: $site, uri: $uri) {
      ...BaseFields
      ... on rubinBasics_post_Entry {
        description: teaser
        siteHandle
        postTags {
          ... on newsTags_Tag {
            slug
            title
          }
        }
        hero {
          ... on heroes_Asset {
            altText
            width
            height
            url @transform(mode: "crop", width: 1920, height: 1067)
          }
        }
        focalPointX
        focalPointY
        heroCaption: captionRichText
        newsAssets: sidebarAssets {
          ... on sidebarAssets_header_BlockType {
            assetHeader
          }
          ... on sidebarAssets_textLink_BlockType {
            text
            textLink {
              url
            }
          }
          ... on sidebarAssets_externalLink_BlockType {
            text
            externalLink
          }
          ... on sidebarAssets_image_BlockType {
            image {
              ... on contentImages_Asset {
                altText
                width
                height
                url @transform(mode: "crop", width: 900, height: 550)
              }
            }
            caption
          }
          ... on sidebarAssets_associatedAsset_BlockType {
            asset {
              metadata: additional {
                AltTextEN
                AltTextES
                CaptionEN
                CaptionES
                Credit
                TitleEN
                TitleES
              }
              id
              width
              height
              url {
                directUrlOriginal
                directUrlPreview
                directUrlPreviewPlay
              }
            }
          }
        }
        contentBlocksNews {
          ...ContentBlocksNews
        }
      }
    }
  }
`);

export default RubinBasicsPostQuery;
