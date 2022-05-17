import { getImageFields } from "@/lib/api/fragments/image";

export const staffProfileFragment = `
  fragment staffProfileFragment on staffProfiles_staffProfiles_Entry {
    id
    title
    typeHandle
    language
    uri
    ...on staffProfiles_staffProfiles_Entry {
			plainText
      image: staffPortrait {
        ...on staffProfiles_Asset {
          ${getImageFields("crop", 200, 200)}
        }
      }
    }
  }
`;

export const staffProfileFragmentFull = `
  fragment staffProfileFragmentFull on staffProfiles_staffProfiles_Entry {
    id
    title
    language
    uri
    localized {
      uri
      language
    }
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
          ${getImageFields("fit", 270)}
        }
      }
      contentBlocks: contentBlocksNews {
        ...textBlockNews
        ...imageBlockNews
        ...linkBlockNews
        ...contactBlockNews
        ...relatedContentBlockNews
        ...videoBlockNews
      }    
    }
  }
`;
