import { fullBaseFields } from "@/lib/api/fragments/shared";
import { getImageFields } from "@/lib/api/fragments/image";
import { allPageBlocks } from "@/lib/api/fragments/content-blocks";

export const educatorPageFragment = `
  fragment educatorPageFragment on pages_educatorPages_Entry {
    id
    title
    uri
    ...on pages_educatorPages_Entry {
      date: dateUpdated
      description
      image: featuredImage {
        ... on contentImages_Asset {
          ${getImageFields("crop", 900, 550)}
        }
      }
    }
  }
`;

export const educatorPageFragmentFull = `
fragment educatorPageFragmentFull on pages_educatorPages_Entry {
  level
  ...on pages_educatorPages_Entry {
    description
    hero {
      ...on heroes_Asset {
        ${getImageFields("crop", 1920, 1067)}
      }
    }
    overlapHero
    hideTitle
    pageType
    dynamicComponent
    featuredImage {
      ... on contentImages_Asset {
        ${getImageFields("crop", 800, 600)}
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
      ${allPageBlocks}
    }
  }
}
`;

export const searchFragmentFull = `
fragment searchFragmentFull on searchResults_searchResults_Entry {
  ${fullBaseFields}
  ...on searchResults_searchResults_Entry {
    dynamicComponent
  }
}
`;
