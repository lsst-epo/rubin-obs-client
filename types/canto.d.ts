type ValidCantoSize = 100 | 240 | 320 | 500 | 640 | 800 | 2050;
interface CantoAdditional {
  AltTextEN: string | null;
  AltTextES: string | null;
  CaptionEN: string | null;
  CaptionES: string | null;
  Credit: string | null;
  Description: string | null;
  ID: string | null;
  MediaConsent: string | null;
  MetadataVersion: string | null;
  Publisher: string | null;
  PublisherID: string | null;
  SocialMediaDescription: string | null;
  SocialMediaHandles: string | null;
  SpatialCoordinateFrame: string | null;
  SpatialCoordinateSystemProjection: string | null;
  SpatialReferenceDimension: string | null;
  SpatialReferencePixel: string | null;
  SpatialReferenceValue: string | null;
  SpatialRotation: string | null;
  SpatialScale: string | null;
  Title: string | null;
  TitleEN: string | null;
  TitleES: string | null;
  Type: string | null;
  UploadedBy: string | null;
  UploaderContact: string | null;
  UsageTerms: string | null;
  WebDAMGroupID: string | null;
  WebDAMMediaType: string | null;
  WebDAMPublisher: string | null;
  WebDAMPublisherID: string | null;
  WebDAMSublocation: string | null;
}

interface CantoURL {
  HighJPG: string;
  LowJPG: string;
  PNG: string;
  detail: string;
  directUrlOriginal: string;
  directUrlPreview: string;
  directUrlPreviewPlay: string;
  download: string;
  metadata: string;
  preview: string;
}

interface CantoAsset {
  approvalStatus: string | null;
  metadata: CantoAdditional;
  created: string | null;
  height: string;
  id: string | null;
  keyword: Array<string>;
  name: string | null;
  owner: string | null;
  ownerName: string | null;
  scheme: string | null;
  size: string | null;
  smartTags: Array<string>;
  tag: Array<string>;
  time: string | null;
  url: CantoURL;
  width: string;
}
