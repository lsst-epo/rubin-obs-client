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
