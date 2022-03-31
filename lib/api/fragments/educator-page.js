import { getImageFields } from "@/lib/api/fragments/image";

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
          ${getImageFields("crop", 450, 275)}
        }
      }
    }
  }
`;

export const educatorPageFragmentFull = `
fragment educatorPageFragmentFull on pages_educatorPages_Entry {
  id
  uri
  title
  language
  typeHandle
  localized {
    uri
    language
  }
  ...on pages_educatorPages_Entry {
    description
    hero {
      ...on heroes_Asset {
        ${getImageFields("crop", 1920, 1067)}
        focalPointX
        focalPointY
      }
    }
    hideTitle
    pageType
    dynamicComponent
    featuredImage {
      ... on contentImages_Asset {
        ${getImageFields("crop", 800, 600)}
      }
    }
    subHeroText
    subHeroHeader: plainText
    contentBlocks {
      ...accordionGroupBlock
      ...calloutBlock
      ...complexTableBlock
      ...contactBlock
      ...ctaGridBlock
      ...imageBlock
      ...linkBlock
      ...newsBlock
      ...relatedContentBlock
      ...scheduleBlock
      ...shareBlock
      ...simpleTableBlock
      ...slideBlock
      ...staffGridBlock
      ...tableGroupBlock
      ...textBlock
      ...videoBlock
      ...downloadListBlock
    }
  }
}
`;

export const searchFragmentFull = `
fragment searchFragmentFull on searchResults_searchResults_Entry {
  id
  uri
  title
  language
  localized {
    uri
    language
  }
  ...on searchResults_searchResults_Entry {
    dynamicComponent
  }
}
`;
