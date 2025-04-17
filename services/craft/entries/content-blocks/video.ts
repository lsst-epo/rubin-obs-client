import { graphql } from "@/gql";

const VideoBlockFragment = graphql(`
  fragment videoBlock on contentBlocks_video_BlockType {
    id
    typeHandle
    backgroundColor
    caption
    url: externalUrlTranslatable
  }
`);

export default VideoBlockFragment;
