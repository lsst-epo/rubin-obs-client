import {
  CantoAdditionalType,
  CantoDamAssetInterface,
  CantoDefaultType,
  CantoUrlType,
} from "@/gql/graphql";
import {
  CantoAssetAdditional,
  CantoAssetScheme,
} from "@/lib/api/galleries/schema";

export interface CantoImage {
  url: {
    directUrlPreview: string;
    directUrlOriginal: string;
  };
  width: string;
  height: string;
  metadata: CantoAssetAdditional;
}

export interface CantoDetailedAsset {
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
  default: CantoDefaultType;
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
