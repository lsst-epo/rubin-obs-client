import { getImageFields } from "@/lib/api/fragments/image";
import { fullBaseFields } from "@/lib/api/fragments/shared";
import { allPageBlocks } from "@/lib/api/fragments/content-blocks";
export const pageFragment = `
  fragment pageFragment on pages_pages_Entry {
    id
    title
    uri
    ...on pages_pages_Entry {
      date: dateUpdated
      description
      image: featuredImage {
        ... on contentImages_Asset {
          ${getImageFields("crop", 450, 275)}
        }
      }
    }
  }
`;

export const pageFragmentFull = `
fragment pageFragmentFull on pages_pages_Entry {
  ${fullBaseFields}
  level
  ...on pages_pages_Entry {
    description
    hero {
      ...on heroes_Asset {
        ${getImageFields("crop", 1920, 1067)}
      }
    }
    overlapHero
    hideTitle
    pageType
    typeHandle
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
    subHeroColorScheme: colorScheme
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

export const userProfileFragmentFull = `
fragment userProfileFragmentFull on userProfilePage_userProfilePage_Entry {
  ${fullBaseFields}
}
`;
