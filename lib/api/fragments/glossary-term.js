import { fullBaseFields } from "@/lib/api/fragments/shared";

export const glossaryTermFragment = `
  fragment glossaryTermFragment on glossaryTerms_glossaryTerm_Entry {
    ${fullBaseFields}
  }
`;

export const glossaryTermFragmentFull = `
  fragment glossaryTermFragmentFull on glossaryTerms_glossaryTerm_Entry {
    ${fullBaseFields}
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
