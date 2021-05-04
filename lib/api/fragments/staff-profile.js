import { getImageFields } from "@/lib/api/fragments/image";

export const staffProfileFragment = `
  fragment staffProfileFragment on staffProfiles_staffProfiles_Entry {
    id
    title
    typeHandle
    language
    uri
    ...on staffProfiles_staffProfiles_Entry {
      date: dateUpdated
      description: staffBio
      staffPullQuote: header
			plainText
      image: staffPortrait {
        ...on staffProfiles_Asset {
          ${getImageFields("crop", 200, 200)}
        }
      }
      staffType {
          id
          title
          slug
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
      staffPullQuote: header
			plainText
      staffBio
      staffLocation
      image: staffPortrait {
        ...on staffProfiles_Asset {
          ${getImageFields("crop", 200, 200)}
        }
      }
      staffType {
          id
          title
          slug
      }
      featuredImage: staffPortrait {
        ...on staffProfiles_Asset {
          ${getImageFields("crop", 800, 800)}
        }
      }
    }
  }
`;
