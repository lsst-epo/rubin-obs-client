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

export const fullBaseFieldsFragment = `
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
