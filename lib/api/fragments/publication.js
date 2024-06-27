import { fullBaseFields } from "@/lib/api/fragments/shared";

export const publicationFragment = `
  fragment publicationFragment on publications_publication_Entry {
    ${fullBaseFields}
    title
    authorPub
    creditPub
    date
    externalUrl
  }
`;
