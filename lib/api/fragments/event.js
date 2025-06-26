export const eventFragment = `
  fragment eventFragment on events_events_Entry {
    id
    uri
    title
    language
    typeHandle
    localized {
      uri
      language
    }
    city
    state
    country
    registrationOpenDate
    registrationCloseDate
    startDate
    endDate: date
    description
    image: hero {
      ... on heroes_Asset {
        altText
        width
        height
        url @transform(mode: "crop", width: 900, height: 550)
      }
    }
    hero {
      ... on heroes_Asset {
        altText
        width
        height
        url @transform(mode: "crop", width: 400, height: 400)
      }
    }
    eventType {
      id
      title
      slug
    }
  }
`;

export const eventFragmentRSS = `
  fragment eventFragmentRSS on events_events_Entry {
    sectionHandle
    url
    title
    date: dateUpdated
    ...on events_events_Entry {
      description
      image: hero {
        ...on heroes_Asset {
                  altText
                  width
                  height
                  url @transform(mode: "crop", width: 800, height: 600)
        }
      }
    }
  }
`;
