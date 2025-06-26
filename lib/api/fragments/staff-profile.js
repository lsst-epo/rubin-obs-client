import { fullBaseFields } from "@/lib/api/fragments/shared";

export const staffProfileFragment = `
  fragment staffProfileFragment on staffProfiles_staffProfiles_Entry {
    ${fullBaseFields}
    ...on staffProfiles_staffProfiles_Entry {
			plainText
      image: staffPortrait {
        ...on staffProfiles_Asset {
                  altText
                  width
                  height
                  url @transform(mode: "crop", width: 400, height: 400)
        }
      }
    }
  }
`;

export const staffProfileFragmentRSS = `
  fragment staffProfileFragmentRSS on staffProfiles_staffProfiles_Entry {
    sectionHandle
    url
    title
    date: dateUpdated
    ...on staffProfiles_staffProfiles_Entry {
      position: plainText
      location: staffLocation
      description: staffBio
      image: staffPortrait {
        ...on staffProfiles_Asset {
                  altText
                  width
                  height
                  url @transform(mode: "crop", width: 800, height: 600)
        }
      }
    }
  }
`;
