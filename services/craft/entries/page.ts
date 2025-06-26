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

const PageQuery = graphql(`
  query getPageEntry(
    $section: [String]
    $type: [String]
    $site: [String]
    $uri: [String]
  ) {
    entry(section: $section, type: $type, site: $site, uri: $uri) {
      ...BaseFields
      ... on pages_pages_Entry {
        level
        description
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
        overlapHero
        hideTitle
        pageType
        typeHandle
        dynamicComponent
        eventFilter: eventType {
          id
        }
        showSidebar
        sidebarAssets {
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
        }
        ancestors {
          ... on pages_pages_Entry {
            id
            uri
            title
          }
          ... on pages_educatorPages_Entry {
            id
            uri
            title
          }
          ... on pages_investigationLandingPage_Entry {
            id
            uri
            title
          }
          ... on pages_redirectPage_Entry {
            id
            uri
            title
          }
        }
        parent {
          id
          uri
          title
          children {
            ... on pages_pages_Entry {
              uri
              title
            }
            ... on pages_educatorPages_Entry {
              uri
              title
            }
            ... on pages_investigationLandingPage_Entry {
              uri
              title
            }
            ... on pages_redirectPage_Entry {
              uri
              title
            }
          }
        }
        showGuideNav: showSiblingNav
        subHeroText
        subHeroHeader: plainText
        subHeroColorScheme: colorScheme
        contentBlocks {
          ...ContentBlocks
        }
      }
    }
  }
`);

export default PageQuery;
