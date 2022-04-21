import { getImageFields } from "@/lib/api/fragments/image";

export const investigationFragment = `
  fragment investigationFragment on investigations_investigation_Entry {
    id
    title
    uri
    ...on investigations_investigation_Entry {
      date: dateUpdated
      # description
      image {
        ... on calloutImages_Asset {
          ${getImageFields("crop", 450, 275)}
        }
      }
    }
  }
`;
