import { fullBaseFields } from "@/lib/api/fragments/shared";

export const educatorPageFragment = `
  fragment educatorPageFragment on pages_educatorPages_Entry {
    ${fullBaseFields}
    ...on pages_educatorPages_Entry {
      date: dateUpdated
      description
      image: hero {
      ...on heroes_Asset {
                  altText
                  width
                  height
                  url @transform(mode: "crop", width: 900, height: 550)
        }
      }
    }
  }
`;
