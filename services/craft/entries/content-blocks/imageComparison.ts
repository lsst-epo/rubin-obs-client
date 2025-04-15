import { graphql } from "@/gql";

const ImageComparisonBlockFragment = graphql(`
  fragment imageComparisonBlock on contentBlocks_imageComparison_BlockType {
    id
    typeHandle
    backgroundColor
    caption: captionRichText
    images: multipleCantoAssets {
      ...CantoAssetMetadata
    }
  }
`);

export default ImageComparisonBlockFragment;
