import { graphql } from "@/gql";

export const CalloutMain = graphql(`
  fragment CalloutMain on callouts_callout_Entry {
    backgroundColor
    dynamicComponent
    header
    cantoAssetSingle {
      ...CantoAssetMetadata
    }
    links {
      ...LinksFragment
    }
    padImage
    order
    ratio
    text
    calloutType: typeHandle
    width
  }
`);

export const CalloutNews = graphql(`
  fragment CalloutNews on callouts_calloutNews_Entry {
    calloutType: typeHandle
    backgroundColor
    id
    entry: newsEntry {
      ... on news_post_Entry {
        title
        url
        date
        dateCreated
        description: teaser
        pressReleaseId
        hero {
          ... on heroes_Asset {
            altText
            width
            height
            url @transform(mode: "crop", width: 900, height: 550)
          }
        }
        image: hero {
          ... on heroes_Asset {
            altText
            width
            height
            url @transform(mode: "crop", width: 900, height: 550)
          }
        }
        entryType: postType {
          title
          slug
        }
        postType {
          id
          title
          slug
        }
      }
    }
  }
`);

export const CalloutEvent = graphql(`
  fragment CalloutEvent on callouts_calloutEvent_Entry {
    calloutType: typeHandle
    backgroundColor
    id
    entry: eventEntry {
      ... on events_events_Entry {
        title
        url
        startDate
        endDate: date
        description
        hero {
          ... on heroes_Asset {
            altText
            width
            height
            url @transform(mode: "crop", width: 900, height: 550)
          }
        }
        image: hero {
          ... on heroes_Asset {
            altText
            width
            height
            url @transform(mode: "crop", width: 900, height: 550)
          }
        }
        entryType: eventType {
          title
          slug
        }
      }
    }
  }
`);
