import { graphql } from "@/gql";

const TextBlockFragment = graphql(`
  fragment textBlock on contentBlocks_text_BlockType {
    id
    typeHandle
    backgroundColor
    text
  }
`);

export default TextBlockFragment;
