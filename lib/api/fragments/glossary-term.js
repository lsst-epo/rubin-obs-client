import { getImageFields } from "@/api/fragments/image";

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
      image {
        ... on generalImages_Asset {
          ${getImageFields("fit", 900)}
        }
      }
      caption
    }
    ancestors {
      title
    }
  }
`;
