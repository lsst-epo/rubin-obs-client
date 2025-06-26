import { graphql } from "@/gql";

const EducatorPageQuery = graphql(`
  query getEducatorPageEntry(
    $section: [String]
    $type: [String]
    $site: [String]
    $uri: [String]
  ) {
    entry(section: $section, type: $type, site: $site, uri: $uri) {
      ...BaseFields
      ... on pages_educatorPages_Entry {
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
        dynamicComponent
        image: hero {
          ... on heroes_Asset {
            altText
            width
            height
            url @transform(mode: "crop", width: 900, height: 550)
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
        contentBlocks {
          ...ContentBlocks
        }
      }
    }
  }
`);

export default EducatorPageQuery;
