import { fullBaseFields } from "@/lib/api/fragments/shared";
import { getImageFields } from "@/lib/api/fragments/image";
import { allNewsBlocks } from "@/lib/api/fragments/content-blocks";

export const staffProfileFragment = `
  fragment staffProfileFragment on staffProfiles_staffProfiles_Entry {
    ${fullBaseFields}
    ...on staffProfiles_staffProfiles_Entry {
			plainText
      image: staffPortrait {
        ...on staffProfiles_Asset {
          ${getImageFields("crop", 400, 400)}
        }
      }
    }
  }
`;

export const staffProfileFragmentFull = `
  fragment staffProfileFragmentFull on staffProfiles_staffProfiles_Entry {
    ...on staffProfiles_staffProfiles_Entry {
      bio: staffBio
      heroImage: staffPortrait {
        ...on staffProfiles_Asset {
          ${getImageFields("crop", 1920, 1067)}
        }
      }
      featuredImage: staffPortrait {
        ...on staffProfiles_Asset {
          ${getImageFields("crop", 800, 600)}
        }
      }
      quote: pullQuote
      tags: staffTags {
        ... on staffTags_Tag {
          id
          slug
          title
        }
      }
      tradingCard: staffTradingCard {
        ...on staffProfiles_Asset {
          ${getImageFields("fit", 540)}
        }
      }
      contentBlocks: contentBlocksNews {
        ${allNewsBlocks}
      }    
    }
  }
`;

export const staffProfileFragmentRSS = `
  fragment staffProfileFragmentRSS on staffProfiles_staffProfiles_Entry {
    sectionHandle
    url
    title
    date: dateUpdated
    ...on staffProfiles_staffProfiles_Entry {
      position: plainText
      location: staffLocation
      description: staffBio
      image: staffPortrait {
        ...on staffProfiles_Asset {
          ${getImageFields("crop", 800, 600)}
        }
      }
    }
  }
`;
