import { fullBaseFields } from "@/lib/api/fragments/shared";
import { getImageFields } from "@/lib/api/fragments/image";
import { allPageBlocks } from "@/lib/api/fragments/content-blocks";

export const pageFragment = `
  fragment pageFragment on pages_pages_Entry {
    ${fullBaseFields}
    ...on pages_pages_Entry {
      date: dateUpdated
      description
      image: hero {
        ...on heroes_Asset {
          ${getImageFields("crop", 900, 550)}
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
  }
`;

export const pageFragmentFull = `
fragment pageFragmentFull on pages_pages_Entry {
  level
  ...on pages_pages_Entry {
    description
    hero {
      ...on heroes_Asset {
        ${getImageFields("crop", 1920, 1067)}
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
          ${getImageFields("crop", 900, 550)}
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
      ${allPageBlocks}
    }
  }
}
`;

export const redirectFragment = `
fragment redirectFragment on pages_redirectPage_Entry {
  linkTo {
    url
  }
}
`;
