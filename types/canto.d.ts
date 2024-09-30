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
