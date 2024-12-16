import {
  CantoAdditionalType,
  CantoDamAssetInterface,
  CantoUrlType,
} from "@/gql/graphql";

interface CantoImage {
  url: {
    directUrlPreview: string;
    directUrlOriginal: string;
    preview: string;
  };
  width: string;
  height: string;
  metadata: Record<string, string>;
}

interface CantoDetailedAsset {
  additional: Pick<
    CantoAdditionalType,
    | "AltTextEN"
    | "AltTextES"
    | "CaptionEN"
    | "CaptionES"
    | "Credit"
    | "TitleEN"
    | "TitleES"
  >;
  approvalStatus: CantoDamAssetInterface["approvalStatus"];
  height: CantoDamAssetInterface["height"];
  id: CantoDamAssetInterface["id"];
  name: CantoDamAssetInterface["name"];
  owner: CantoDamAssetInterface["owner"];
  ownerName: CantoDamAssetInterface["ownerName"];
  scheme: CantoDamAssetInterface["scheme"];
  size: CantoDamAssetInterface["size"];
  smartTags: CantoDamAssetInterface["smartTags"];
  tag: CantoDamAssetInterface["tag"];
  time: CantoDamAssetInterface["time"];
  url: Pick<
    CantoUrlType,
    | "directUrlOriginal"
    | "directUrlPreview"
    | "directUrlPreviewPlay"
    | "download"
    | "metadata"
    | "preview"
    | "HighJPG"
    | "PNG"
  >;
  width: CantoDamAssetInterface["width"];
}
