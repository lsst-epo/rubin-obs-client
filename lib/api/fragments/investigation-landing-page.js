import { getImageFields } from "@/lib/api/fragments/image";

export const investigationLandingPageFragment = `
  fragment investigationLandingPageFragment on pages_investigationLandingPage_Entry {
    id
    title
    uri
    ...on pages_investigationLandingPage_Entry {
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

export const investigationLandingPageFragmentFull = `
fragment investigationLandingPageFragmentFull on pages_investigationLandingPage_Entry {
  id
  uri
  title
  language
  typeHandle
  localized {
    uri
    language
  }
  childNavigation: landingNavigation {
    ... on landingNavigation_navItem_BlockType {
      navLink {
        url
        text
      }
    }
  }
  childNavigationTitle: header
  childNavigationDescription: text
  ...on pages_investigationLandingPage_Entry {
    hideTitle
    contentBlocks {
      ...accordionGroupBlock
      ...calloutBlock
      ...complexTableBlock
      ...contactBlock
      ...ctaGridBlock
      ...imageBlock
      ...investigationGridBlock
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
      ...embedBlock
    }
  }
}
`;
