export const galleryFragment = `
  fragment galleryFragment on galleryItems_gallery_Entry {
    id
    cantoAlbum {
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
    }
  }
`;

export const galleryGlobalFragment = `
  fragment galleryGlobalFragment on gallery_GlobalSet {
    galleryEntryPaginated: galleryEntry {
      ... on galleryItems_gallery_Entry {
        cantoAlbum(reverse: $inReverse, forPage: {page: $offset, items: 20}) {
          id
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
            TitleEN
            TitleES
          }
        }
      }
    }
    galleryEntryAll: galleryEntry {
      ... on galleryItems_gallery_Entry {
        cantoAlbum {
          id
        }
      }
    }
  }
`;
