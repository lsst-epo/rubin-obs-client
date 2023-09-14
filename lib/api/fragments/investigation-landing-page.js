import { fullBaseFields } from "@/lib/api/fragments/shared";
import { getImageFields } from "@/lib/api/fragments/image";
import { allPageBlocks } from "@/lib/api/fragments/content-blocks";

export const investigationLandingPageFragment = `
  fragment investigationLandingPageFragment on pages_investigationLandingPage_Entry {
    ${fullBaseFields}
    ...on pages_investigationLandingPage_Entry {
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

export const investigationLandingPageFragmentFull = `
fragment investigationLandingPageFragmentFull on pages_investigationLandingPage_Entry {
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
      ${allPageBlocks}
    }
  }
}
`;
