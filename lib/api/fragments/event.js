import { getImageFields } from "@/lib/api/fragments/image";

export const eventFragment = `
  fragment eventFragment on events_events_Entry {
    id
    title
    language
    localized {
      uri
      language
    }
    uri
    ...on events_events_Entry {
      city
      state
      country
      registrationOpenDate
      registrationCloseDate
      date
      endDate
      description
      image: hero {
        ...on heroes_Asset {
          ${getImageFields("crop", 200, 200)}
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
    id
    title
    language
    localized {
      uri
      language
    }
    uri
    ...on events_events_Entry {
      address
      city
      state
      country
      registrationOpenDate
      registrationCloseDate
      date
      endDate
      description
      hero {
        ...on heroes_Asset {
          ${getImageFields("crop", 1920, 1067)}
          focalPointX
          focalPointY
        }
      } 
      featuredImage: hero {
        ...on heroes_Asset {
          ${getImageFields("crop", 800, 800)}
        }
      }
      eventType {
        id
        title
        slug
      }
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
      }    
    }
  }
`;
