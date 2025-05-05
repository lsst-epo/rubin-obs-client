import { graphql } from "@/gql";

const ImageBlockFragment = graphql(`
  fragment imageBlock on contentBlocks_image_BlockType {
    id
    typeHandle
    caption
    image: contentImage {
      ... on contentImages_Asset {
        altText
        width
        height
        url @transform(mode: "fit", width: 900)
      }
    }
    cantoImage: cantoAssetSingle {
      ...CantoAssetDetailed
    }
    floatDirection
    backgroundColor
  }
`);

export const ImageNewsBlockFragment = graphql(`
  fragment imageBlockNews on contentBlocksNews_image_BlockType {
    id
    typeHandle
    caption
    image: contentImage {
      ... on contentImages_Asset {
        altText
        width
        height
        url @transform(mode: "fit", width: 900)
      }
    }
    cantoImage: cantoAssetSingle {
      ...CantoAssetDetailed
    }
    floatDirection
  }
`);

export default ImageBlockFragment;
