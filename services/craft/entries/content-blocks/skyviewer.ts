import { graphql } from "@/gql";

const SkyviewerBlockFragment = graphql(`
  fragment skyviewerBlock on contentBlocks_skyviewer_BlockType {
    id
    embedTitle
    typeHandle
    captionRichText
    dec
    fov
    ra
    fullWidth
    backgroundColor
  }
`);

export const SkyviewerNewsBlockFragment = graphql(`
  fragment skyviewerNewsBlock on contentBlocksNews_skyviewer_BlockType {
    id
    embedTitle
    typeHandle
    captionRichText
    dec
    fov
    ra
    fullWidth
    backgroundColor
  }
`);

export default SkyviewerBlockFragment;
