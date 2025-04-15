import { graphql } from "@/gql";

const LinkedImageListBlockFragment = graphql(`
  fragment linkedImageListBlock on contentBlocks_linkedImageList_BlockType {
    id
    typeHandle
    description
    header
    variant: linkedImageListVariant
    linkedImageList {
      ... on linkedImageList_linkedImage_BlockType {
        id
        image {
          ...CantoAssetMetadata
        }
        link: imageLink {
          customText
          target
          text
          title
          type
          url
        }
      }
    }
  }
`);

export default LinkedImageListBlockFragment;
