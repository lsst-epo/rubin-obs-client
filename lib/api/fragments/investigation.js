export const investigationFragment = `
  fragment investigationFragment on investigations_investigation_Entry {
    id
    title
    uri
    ...on investigations_investigation_Entry {
      date: dateUpdated
      # description
      damAsset {
        height
        width
        damMetadata {
          metadataKey
          metadataValue
        }
      }
    }
  }
`;
