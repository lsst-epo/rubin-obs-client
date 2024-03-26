import { fullBaseFields } from "@/lib/api/fragments/shared";
import { getImageFields } from "@/lib/api/fragments/image";
import { allPageBlocks } from "@/lib/api/fragments/content-blocks";

export const eventFragment = `
  fragment eventFragment on events_events_Entry {
    ${fullBaseFields}
    ...on events_events_Entry {
      city
      state
      country
      registrationOpenDate
      registrationCloseDate
      startDate
      endDate: date
      description
      image: featuredImage {
        ...on contentImages_Asset {
          ${getImageFields("crop", 400, 400)}
        }
      }
      hero {
        ...on heroes_Asset {
          ${getImageFields("crop", 400, 400)}
        }
      }
      eventType {
        id
        title
        slug
      }
    }
  }
`;

export const eventFragmentFull = `
  fragment eventFragmentFull on events_events_Entry {
    ...on events_events_Entry {
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
        ...on heroes_Asset {
          ${getImageFields("crop", 1920, 1067)}
        }
      }
      focalPointX
      focalPointY
      image: featuredImage {
        ...on contentImages_Asset {
          ${getImageFields("crop", 800, 800)}
        }
      }
      eventType {
        id
        title
        slug
      }
      contentBlocks {
        ${allPageBlocks}
      }  
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
          ${getImageFields("crop", 800, 600)}
        }
      }
    }
  }
`;
