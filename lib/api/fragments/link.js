import { gql } from "@urql/core";

export function getLinkFields() {
  return `
    customText
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
  fragment links on links_link_BlockType {
    mixedLink {
      ... on linkField_Link {
        customText
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
`;
