import { graphql } from "@/gql";

const AccordionGroupBlockFragment = graphql(`
  fragment accordionGroupBlock on contentBlocks_accordionGroup_BlockType {
    id
    typeHandle
    header
    backgroundColor
    accordions: children {
      ... on contentBlocks_accordion_BlockType {
        id
        text
        header
      }
    }
  }
`);

export default AccordionGroupBlockFragment;
