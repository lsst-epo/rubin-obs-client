import { graphql } from "@/gql";

const ShareBlockFragment = graphql(`
  fragment shareBlock on contentBlocks_share_BlockType {
    id
    typeHandle
    backgroundColor
    shareVariant
    text
  }
`);

export default ShareBlockFragment;
