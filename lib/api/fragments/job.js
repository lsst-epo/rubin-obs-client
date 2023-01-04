import { fullBaseFields } from "@/lib/api/fragments/shared";

export const jobFragment = `
  fragment jobFragment on jobs_job_Entry {
    ${fullBaseFields}
    ...on jobs_job_Entry {
      date: dateUpdated
      openDate
      closeDate
      externalUrl
      subLocation {
        title
        ... on location_Category {
          address
          city
          state
          country
        }
      }      
      jobPosition {
        id
        title
        slug
      }
    }
  }
`;
