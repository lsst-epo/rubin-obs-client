import { fullBaseFields } from "@/lib/api/fragments/shared";
import { cantoSingleAsset } from "@/api/fragments/image";

export const glossaryTermFragment = `
  fragment glossaryTermFragment on glossaryTerms_glossaryTerm_Entry {
    ${fullBaseFields}
  }
`;

export const glossaryTermFragmentFull = `
  fragment glossaryTermFragmentFull on glossaryTerms_glossaryTerm_Entry {
    ...on glossaryTerms_glossaryTerm_Entry {
      text
      ${cantoSingleAsset}
      caption
    }
    ancestors {
      title
    }
  }
`;
