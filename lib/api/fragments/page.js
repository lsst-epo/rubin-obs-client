import { fullBaseFields } from "@/lib/api/fragments/shared";
import { getImageFields } from "@/lib/api/fragments/image";
import { allPageBlocks } from "@/lib/api/fragments/content-blocks";

export const pageFragment = `
  fragment pageFragment on pages_pages_Entry {
    ${fullBaseFields}
    ...on pages_pages_Entry {
      date: dateUpdated
      description
      image: featuredImage {
        ... on contentImages_Asset {
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
    featuredImage {
      ... on contentImages_Asset {
        ${getImageFields("crop", 800, 600)}
      }
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
      ... on sidebarAssets_galleryItem_BlockType {
        galleryItem {
          uri
          ... on galleryItems_galleryItem_Entry {
            representativeAssetVariant {
              ... on assetVariants_Asset {
                ${getImageFields("crop", 900, 550)}
              }
            }
          }
        }
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
  ...on searchResults_searchResults_Entry {
    dynamicComponent
  }
}
`;

export const userProfileFragmentFull = `
fragment userProfileFragmentFull on userProfilePage_userProfilePage_Entry {
  id
}
`;

export const userProfileFragment = `
fragment userProfileFragment on EntryInterface {
  title
  uri
}
`;

export const redirectFragment = `
fragment redirectFragment on pages_redirectPage_Entry {
  linkTo {
    url
  }
}
`;
