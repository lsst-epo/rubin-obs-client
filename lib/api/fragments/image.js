import { gql } from "graphql-request";
import { gql as urqlGql } from "@urql/core";

export const cantoSingleAsset = gql`
cantoAssetSingle {
  url {
    directUrlPreview
    directUrlOriginal
    PNG
    HighJPG
    LowJPG
    preview
  }
  width
  height
  metadata: additional {
    AltTextEN
    AltTextES
    CaptionEN
    CaptionES
    Credit
  }
  fileInfo: metadata {
    fileType: FileTypeExtension
  }
}`;

export const cantoAssetSingleFragment = urqlGql`

fragment CantoAssetSingle on CantoDamAssetInterface {
  url {
    directUrlPreview
    directUrlOriginal
    PNG
    HighJPG
    LowJPG
    preview
  }
  width
  height
  metadata: additional {
    AltTextEN
    AltTextES
    CaptionEN
    CaptionES
    Credit
  }
  fileInfo: metadata {
    fileType: FileTypeExtension
  }
}
`;
