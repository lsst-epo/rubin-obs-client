import { fullBaseFields } from "@/lib/api/fragments/shared";
import { allPageBlocks } from "@/lib/api/fragments/content-blocks";

export const studentPageFragment = `
  fragment studentPageFragment on pages_studentPages_Entry {
    ${fullBaseFields}
    ...on pages_studentPages_Entry {
      date: dateUpdated
      description
      image: hero {
      ...on heroes_Asset {
                  altText
                  width
                  height
                  url @transform(mode: "crop", width: 900, height: 550)
        }
      }
    }
  }
`;

export const studentPageFragmentFull = `
      ${allPageBlocks}
fragment studentPageFragmentFull on pages_studentPages_Entry {
  ...on pages_studentPages_Entry {
    description
    hero {
      ...on heroes_Asset {
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
`;
