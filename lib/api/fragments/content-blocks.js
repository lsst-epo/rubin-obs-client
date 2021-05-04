import { getImageFields } from "@/api/fragments/image";
import { linkFragment, getLinkFields } from "@/api/fragments/link";

/// ///////////////////////////////////////////
///   Page Content Blocks
/// ///////////////////////////////////////////
export const accordionGroupBlockFragment = `
  fragment accordionGroupBlock on contentBlocks_NeoField {
    ... on contentBlocks_accordionGroup_BlockType {
      id
      typeHandle
      header
      accordions: children {
        ... on contentBlocks_accordion_BlockType {
          id
          text
          header
        }
      }
    }
  }
`;

export const calloutBlockFragment = `
  fragment calloutBlock on contentBlocks_NeoField {
    ...on contentBlocks_callout_BlockType {
      id
      typeHandle
      callout {
        ...on callouts_callout_Entry {
          backgroundColor
          dynamicComponent
          header
          image {
            ...on calloutImages_Asset {
              ${getImageFields("fit", 750)}
            }
          }
          links {
            ...links
          }
          padImage
          order
          ratio
          text
          calloutType: typeHandle
          width
        }
        ...on callouts_calloutTwoTone_Entry {
          backgroundColor
          backgroundImage: image {
            ...on calloutImages_Asset {
              ${getImageFields("fit", 750)}
            }
          }
          captionRichText
          header
          image: contentImage {
            ...on contentImages_Asset {
              ${getImageFields("crop", 450, 275)}
            }
          }
          links {
            ...links
          }
          text
          calloutType: typeHandle
        }
      }
    }
  }
`;

export const contactBlockFragment = `
  fragment contactBlock on contentBlocks_NeoField {
    ...on contentBlocks_contact_BlockType {
      id
      typeHandle
      header
      linkText
      pageEntry {
        id
        uri
        title
      }
    }
  }
`;

export const ctaGridBlockFragment = `
  fragment ctaGridBlock on contentBlocks_NeoField {
    ... on contentBlocks_ctaGrid_BlockType {
      typeHandle
      id
      header
      mixedLink {
        ${getLinkFields()}
      }
      items: children {
        ... on contentBlocks_cta_BlockType {
          id
          contentImage {
            ...on contentImages_Asset {
              ${getImageFields("crop", 286, 158)}
            }
          }
          mixedLink {
            ${getLinkFields()}
          }
        }
      }
    }
  }
`;

export const imageBlockFragment = `
  fragment imageBlock on contentBlocks_NeoField {
    ...on contentBlocks_image_BlockType {
      id
      typeHandle
      caption
      image: contentImage {
        ...on contentImages_Asset {
          ${getImageFields()}
        }
      }
    }
  }
`;

export const linkBlockFragment = `
  fragment linkBlock on contentBlocks_NeoField {
    ...on contentBlocks_link_BlockType {
      id
      typeHandle
      mixedLink {
        ${getLinkFields()}
      }
    }
  }
`;

export const newsBlockFragment = `
  fragment newsBlock on contentBlocks_NeoField {
    ... on contentBlocks_news_BlockType {
      id
      header
      mixedLink {
        ${getLinkFields()}
      }
      postType {
        id
        title
        slug
      }
      numberOfItems
      typeHandle
      items: children {
        ... on contentBlocks_newsItem_BlockType {
          entry: newsEntry {
            id
            title
            uri
            ...on news_post_Entry {
              description: teaser
              image: hero {
                ...on heroes_Asset {
                  ${getImageFields("crop", 450, 275)}
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const relatedContentFragment = `
  fragment relatedContentBlock on contentBlocks_NeoField {
    ... on contentBlocks_relatedContent_BlockType {
      id
      header
      mixedLink {
        ${getLinkFields()}
      }
      numberOfItems
      typeHandle
      items: children {
        ... on contentBlocks_relatedContentItem_BlockType {
          entry: pagePostEntry {
            id
            title
            uri
            ... on pages_pages_Entry {
              description
              image: featuredImage {
                ...on contentImages_Asset {
                  ${getImageFields("crop", 450, 275)}
                }
              }
            }
            ...on news_post_Entry {
              description: teaser
              image: hero {
                ...on heroes_Asset {
                  ${getImageFields("crop", 450, 275)}
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const scheduleBlockFragment = `
  fragment scheduleBlock on contentBlocks_NeoField {
    ... on contentBlocks_schedule_BlockType {
      typeHandle
      date
      description
      scheduleRows: children {
        ... on contentBlocks_scheduleRow_BlockType {
          startTime
          endTime
          description
          bold
        }
      }
    }
  }
`;

export const shareBlockFragment = `
  fragment shareBlock on contentBlocks_NeoField {
    ...on contentBlocks_share_BlockType {
      id
      typeHandle
    }
  }
`;

export const slideBlockFragment = `
  fragment slideBlock on contentBlocks_NeoField {
    ... on contentBlocks_slideBlock_BlockType {
      id
      header
      mixedLink {
        ${getLinkFields()}
      }
      numberOfItems
      dynamicComponent
      typeHandle
      items: children {
        ... on contentBlocks_slide_BlockType {
          galleryEntry {
            id
            title
            typeHandle
            uri
            ... on galleryItems_galleryItem_Entry {
              description: richTextDescription
              image: representativeAssetVariant {
                ... on assetVariants_Asset {
                ${getImageFields("crop", 600, 400)}
                }
              }
              galleryItemCategory {
                id
                slug
                title
              }
            }
          }
          staffEntry {
            id
            title
            uri
            ... on staffProfiles_staffProfiles_Entry {
              description: staffBio
              image: staffPortrait {
                ...on staffProfiles_Asset {
                  ${getImageFields("crop", 200, 200)}
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const staffGridFragment = `
  fragment staffGridBlock on contentBlocks_NeoField {
    ... on contentBlocks_staffGrid_BlockType {
      id
      header
      mixedLink {
        ${getLinkFields()}
      }
      staffType {
        id
        title
        slug
      }
      numberOfItems
      typeHandle
      items: children {
        ... on contentBlocks_staffGridItem_BlockType {
          entry: staffEntry {
            ... on staffProfiles_staffProfiles_Entry {
              id
              title
              plainText
              image: staffPortrait {
                ...on staffProfiles_Asset {
                  ${getImageFields("crop", 200, 200)}
                }
              }
              uri
            }
          }
        }
      }
    }
  }
`;

export const textBlockFragment = `
  fragment textBlock on contentBlocks_NeoField {
    ... on contentBlocks_text_BlockType {
      typeHandle
      id
      text
    }
  }
`;

export const videoBlockFragment = `
  fragment videoBlock on contentBlocks_NeoField {
    ...on contentBlocks_video_BlockType {
      id
      typeHandle
      caption
      url: externalUrl
    }
  }
`;

export const allPageBlocksFragment = `
${accordionGroupBlockFragment}
${calloutBlockFragment}
${contactBlockFragment}
${ctaGridBlockFragment}
${imageBlockFragment}
${linkBlockFragment}
${newsBlockFragment}
${relatedContentFragment}
${scheduleBlockFragment}
${shareBlockFragment}
${slideBlockFragment}
${staffGridFragment}
${textBlockFragment}
${videoBlockFragment}
`;

/// ///////////////////////////////////////////
///   News Content Blocks
/// ///////////////////////////////////////////

export const textBlockNewsFragment = `
  fragment textBlockNews on contentBlocksNews_NeoField {
    ... on contentBlocksNews_text_BlockType {
      typeHandle
      id
      text
    }
  }
`;

export const imageBlockNewsFragment = `
  fragment imageBlockNews on contentBlocksNews_NeoField {
    ...on contentBlocksNews_image_BlockType {
      id
      typeHandle
      caption
      image: contentImage {
        ...on contentImages_Asset {
          ${getImageFields()}
        }
      }
    }
  }
`;

export const linkBlockNewsFragment = `
  fragment linkBlockNews on contentBlocksNews_NeoField {
    ...on contentBlocksNews_linkedAsset_BlockType {
      id
      typeHandle
      url: externalUrl
      text: header
    }
  }
`;

export const contactBlockNewsFragment = `
  fragment contactBlockNews on contentBlocksNews_NeoField {
    ...on contentBlocksNews_contactStaff_BlockType {
      id
      typeHandle
      header
      staffEntry {
        title
        ... on staffProfiles_staffProfiles_Entry {
          email
          phoneNumber {
            number
          }
          plainText
          subLocation {
            ... on location_Category {
              address
              city
              country
              state
              title
            }
          }
        }
      }
    }
  }
`;

export const relatedContentNewsFragment = `
  fragment relatedContentBlockNews on contentBlocksNews_NeoField {
    ... on contentBlocksNews_relatedContent_BlockType {
      id
      header
      numberOfItems
      typeHandle
      items: children {
        ... on contentBlocksNews_relatedContentItem_BlockType {
          entry: pagePostEntry {
            id
            title
            uri
            ... on pages_pages_Entry {
              description
              image: featuredImage {
                ...on contentImages_Asset {
                  ${getImageFields("crop", 450, 275)}
                }
              }
            }
            ...on news_post_Entry {
              date
              description: teaser
              image: hero {
                ...on heroes_Asset {
                  ${getImageFields("crop", 450, 275)}
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const videoBlockNewsFragment = `
  fragment videoBlockNews on contentBlocksNews_NeoField {
    ...on contentBlocksNews_video_BlockType {
      id
      typeHandle
      caption
      url: externalUrl
    }
  }
`;

export const allNewsBlocksFragment = `
  ${textBlockNewsFragment}
  ${imageBlockNewsFragment}
  ${linkBlockNewsFragment}
  ${contactBlockNewsFragment}
  ${relatedContentNewsFragment}
  ${videoBlockNewsFragment}
`;
