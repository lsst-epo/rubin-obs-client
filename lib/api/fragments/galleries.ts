import { fullBaseFields } from "../fragments/shared";

export const galleryFragment = `
  fragment galleryFragment on galleries_gallery_Entry {
    ${fullBaseFields}
    description
    cantoAssetSingle {
      metadata: additional {
        AltTextEN
        AltTextES
        TitleEN
        TitleES
      }
      height
      url {
        directUrlOriginal
        directUrlPreview
      }
      width
    }
  }
`;
