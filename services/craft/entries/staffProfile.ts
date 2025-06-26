import { graphql } from "@/gql";

const StaffProfileQuery = graphql(`
  query getStaffProfileEntry(
    $section: [String]
    $type: [String]
    $site: [String]
    $uri: [String]
  ) {
    entry(section: $section, type: $type, site: $site, uri: $uri) {
      ...BaseFields
      ... on staffProfiles_staffProfiles_Entry {
        bio: staffBio
        heroImage: staffPortrait {
          ... on staffProfiles_Asset {
            altText
            width
            height
            url @transform(mode: "crop", width: 1920, height: 1067)
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
          ... on staffProfiles_Asset {
            altText
            width
            height
            url @transform(mode: "fit", width: 540)
          }
        }
        contentBlocks: contentBlocksNews {
          ...ContentBlocksNews
        }
      }
    }
  }
`);

export default StaffProfileQuery;
