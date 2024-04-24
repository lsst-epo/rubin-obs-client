import { fullBaseFields } from "@/lib/api/fragments/shared";

export const peopleFragment = `
  fragment peopleFragment on people_person_Entry {
    ${fullBaseFields}
    name: title
    personAffiliation
    cantoAssetSingle
  }
`;
