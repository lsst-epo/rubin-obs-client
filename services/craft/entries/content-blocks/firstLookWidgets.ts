import { graphql } from "@/gql";

const FirstLookWidgetsBlockFragment = graphql(`
  fragment firstLookWidgetsBlock on contentBlocks_firstLookWidgets_BlockType {
    id
    typeHandle
    backgroundColor
    filmReel {
      ... on filmReel_item_BlockType {
        text
        share
      }
    }
    firstLookWidget
  }
`);

export default FirstLookWidgetsBlockFragment;
