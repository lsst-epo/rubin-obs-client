import { graphql } from "@/gql";

const EventQuery = graphql(`
  query getEventEntry(
    $section: [String]
    $type: [String]
    $site: [String]
    $uri: [String]
  ) {
    entry(section: $section, type: $type, site: $site, uri: $uri) {
      ...BaseFields
      ... on events_events_Entry {
        address
        city
        state
        country
        timezone
        registrationOpenDate
        registrationCloseDate
        startDate
        startTime: eventStartTime
        endDate: date
        endTime: eventEndTime
        description
        hero {
          ... on heroes_Asset {
            altText
            width
            height
            url @transform(mode: "crop", width: 1920, height: 1067)
          }
        }
        focalPointX
        focalPointY
        eventType {
          id
          title
          slug
        }
        contentBlocks {
          ...ContentBlocks
        }
      }
    }
  }
`);

export default EventQuery;
