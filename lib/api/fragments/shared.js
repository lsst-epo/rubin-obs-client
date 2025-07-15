import { gql } from "@urql/core";

export const fullBaseFields = `
  id
  uri
  title
  language
  typeHandle
  localized {
    uri
    language
  }
`;

export const fullBaseFieldsFragment = gql`
  fragment fullBaseFieldsFragment on EntryInterface {
    id
    uri
    title
    language
    typeHandle
    localized {
      uri
      language
    }
  }
`;
