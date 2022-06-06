export const glossaryTermFragment = `
  fragment glossaryTermFragment on glossaryTerms_glossaryTerm_Entry {
    id
    title
    language
    uri
    localized {
      uri
      language
    }
  }
`;

export const glossaryTermFragmentFull = `
  fragment glossaryTermFragmentFull on glossaryTerms_glossaryTerm_Entry {
    id
    title
    language
    uri
    localized {
      uri
      language
    }
    ...on glossaryTerms_glossaryTerm_Entry {
      text
      damAsset {
        height
        width
        damMetadata {
          metadataKey
          metadataValue
        }
      }
      caption
    }
    ancestors {
      title
    }
  }
`;
