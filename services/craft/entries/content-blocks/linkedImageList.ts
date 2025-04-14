import { graphql } from "@/gql";

const LinkedImageListBlockFragment = graphql(`
  fragment linkedImageListBlock on contentBlocks_linkedImageList_BlockType {
    id
    typeHandle
    description
    header
    linkedImageList {
      ... on linkedImageList_linkedImage_BlockType {
        id
        image {
          additional {
            AltTextEN
            AltTextES
            TitleEN
            TitleES
          }
          height
          id
          name
          scheme
          url {
            directUrlOriginal
            directUrlPreview
            directUrlPreviewPlay
          }
          width
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
