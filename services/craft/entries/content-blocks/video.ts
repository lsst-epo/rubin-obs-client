import { graphql } from "@/gql";

const VideoBlockFragment = graphql(`
  fragment videoBlock on contentBlocks_video_BlockType {
    id
    typeHandle
    backgroundColor
    caption
    url: externalUrlTranslatable
    cantoAsset: videoType
    fullscreenVideo
    cantoAssets: responsiveAssets {
      ... on responsiveAssets_asset_BlockType {
        orientation
        asset(where: { key: "scheme", value: "video" }) {
          ...CantoAssetMetadata
          default {
            DateUploaded
          }
          metadata {
            MIMEType
          }
        }
      }
    }
  }
`);

export default VideoBlockFragment;
