import { cantoSingleAsset } from "@/api/fragments/image";

export const investigationFragment = `
  fragment investigationFragment on investigations_investigation_Entry {
    id
    title
    uri
    ...on investigations_investigation_Entry {
      date: dateUpdated
      ${cantoSingleAsset}
    }
  }
`;
