import { gql } from "graphql-request";

export function getLinkFields() {
  return gql`
    customText
    target
    text
    title
    type
    url
    element {
      uri
    }
`;
}

export const mixedLinkFragment = gql`
  fragment mixedLink on linkField_Link {
    customText
    target
    text
    title
    type
    url
    element {
      uri
    }
  }
`;

export const linkFragment = gql`
  fragment links on links_NeoField {
    ... on links_link_BlockType {
      mixedLink {
        ... on linkField_Link {
          customText
          target
          text
          title
          type
          url
          element {
            uri
          }
        }
      }
    }
  }
`;
