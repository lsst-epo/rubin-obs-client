import { getImageFields, cantoSingleAsset } from "@/api/fragments/image";
import { getLinkFields } from "@/api/fragments/link";
import { print } from "graphql";
import {
  SkyviewerBlockFragmentDoc,
  SkyviewerNewsBlockFragmentDoc,
  ShareBlockFragmentDoc,
  LinkedImageListBlockFragmentDoc,
  ImageComparisonBlockFragmentDoc,
  ImageBlockFragmentDoc,
  ImageBlockNewsFragmentDoc,
  TextBlockFragmentDoc,
  VideoBlockFragmentDoc,
  FirstLookWidgetsBlockFragmentDoc,
  AccordionGroupBlockFragmentDoc,
  CtaGridBlockFragmentDoc,
  KeyNumbersBlockFragmentDoc,
} from "@/gql/graphql";

/// ///////////////////////////////////////////
///   Page Content Blocks
/// ///////////////////////////////////////////

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
          ${cantoSingleAsset}
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
          backgroundImage: ${cantoSingleAsset}
          captionRichText
          header
          image: contentImage {
            ...on contentImages_Asset {
              ${getImageFields("crop", 900, 550)}
            }
          }
          links {
            ...links
          }
          text
          calloutType: typeHandle
        }
        ...on callouts_calloutQuote_Entry {
          calloutType: typeHandle
          header
          text
          colorScheme
          links {
            ...links
          }
          quote
          attribution
          imageQuote {
            ...on contentImages_Asset {
              ${getImageFields("crop", 492, 492)}
            }
          }
        }
        ... on callouts_calloutNews_Entry {
          calloutType: typeHandle
          backgroundColor
          id
          entry: newsEntry {
            ...on news_post_Entry {
              title
              url
              date
              dateCreated
              description: teaser
              pressReleaseId
              hero {
                ...on heroes_Asset {
                  ${getImageFields("crop", 900, 550)}
                }
              }
              image: hero {
                ...on heroes_Asset {
                  ${getImageFields("crop", 900, 550)}
                }
              }
              entryType: postType {
                title
                slug
              }
              postType {
                id
                title
                slug
              }
            }
          }
        }
        ... on callouts_calloutEvent_Entry {
          calloutType: typeHandle
          backgroundColor
          id
          entry: eventEntry {
            ... on events_events_Entry {
              title
              url
              startDate
              endDate: date
              description
              hero {
                ...on heroes_Asset {
                  ${getImageFields("crop", 900, 550)}
                }
              }
              image: hero {
                ...on heroes_Asset {
                  ${getImageFields("crop", 900, 550)}
                }
              }
              entryType: eventType {
                title
                slug
              }
            }
          }
        }
      }
    }
  }
`;

export const complexTableBlockFragment = `
  fragment complexTableBlock on contentBlocks_NeoField {
    ...on contentBlocks_complexTable_BlockType {
      id
      typeHandle
      plainText
      verticalAlignment
      sites
      complexTable {
        ... on complexTable_BlockType {
          tableRow {
            ... on tableRow_tableCell_BlockType {
              id
              cellWidth
              cellBackground
              cellContent
              hasFlexibleCellWidth
            }
          }
        }
      }
    }
  }
`;

export const tableGroupBlockFragment = `
  fragment tableGroupBlock on contentBlocks_NeoField {
    ...on contentBlocks_tableGroup_BlockType {
      id
      typeHandle
      sites
      items: children {
        ...complexTableBlock
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

export const imageGridBlockFragment = `
  fragment imageGridBlock on contentBlocks_NeoField {
    ... on contentBlocks_imageGrid_BlockType {
      typeHandle
      id
      header
      mixedLink {
        ${getLinkFields()}
      }
      items: children {
        ... on contentBlocks_imageGridItem_BlockType {
          id
          header
          contentImage {
            ...on contentImages_Asset {
              ${getImageFields("crop", 572, 316)}
            }
          }
        }
      }
    }
  }
`;

export const investigationGridBlockFragment = `
  fragment investigationGridBlock on contentBlocks_NeoField {
    ... on contentBlocks_investigationGrid_BlockType {
      typeHandle
      id
      header
      items: children {
        ... on contentBlocks_investigationCta_BlockType {
          id
          useExternalLink
          investigation {
            ... on investigations_investigation_Entry {
              id
              uri
              title
              externalUrl: externalUrlTranslatable
              status: investigationStatus
              ${cantoSingleAsset}
              landingPage {
                uri
                title
              }
            }
          }
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
              hero {
                ...on heroes_Asset {
                  ${getImageFields("crop", 900, 550)}
                }
              }
              image: hero {
                ...on heroes_Asset {
                  ${getImageFields("crop", 900, 550)}
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
      backgroundColor
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
              hero {
                ...on heroes_Asset {
                  ${getImageFields("crop", 900, 550)}
                }
              }
              image: hero {
                ...on heroes_Asset {
                  ${getImageFields("crop", 900, 550)}
                }
              }
            }
            ...on news_post_Entry {
              pressReleaseId
              description: teaser
              hero {
                ...on heroes_Asset {
                  ${getImageFields("crop", 900, 550)}
                }
              }
              image: hero {
                ...on heroes_Asset {
                  ${getImageFields("crop", 900, 550)}
                }
              }
            }
            ...on investigations_investigation_Entry {
              uri
              status: investigationStatus
              description: investigationDescription
              ${cantoSingleAsset}
              landingPage {
                uri
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
      id
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

export const simpleTableBlockFragment = `
  fragment simpleTableBlock on contentBlocks_NeoField {
    ... on contentBlocks_simpleTable_BlockType {
      id
      typeHandle
      sites
      simpleTable {
        ... on simpleTable_tableRow_BlockType {
          id
          rowTitle
          rowContent
          rowColor
        }
      }
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
          staffEntry {
            id
            title
            uri
            ... on staffProfiles_staffProfiles_Entry {
              description: staffBio
              image: staffPortrait {
                ...on staffProfiles_Asset {
                  ${getImageFields("crop", 400, 400)}
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
                  ${getImageFields("crop", 400, 400)}
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

export const downloadListBlockFragment = `
  fragment downloadListBlock on contentBlocks_NeoField {
    ...on contentBlocks_downloadList_BlockType {
      id
      typeHandle
      assetsList {
        ... on assetsList_item_BlockType {
          id
          typeHandle
          linkText
          assetSingle {
            id
            kind
            filename
            url
            size
          }
        }
      }
    }
  }
`;

export const embedBlockFragment = `
  fragment embedBlock on contentBlocks_NeoField {
    ... on contentBlocks_iframe_BlockType {
      id
      typeHandle
      embedTitle
      fullWidth
      embedCode
      embedUrl: externalUrl
    }
  }
`;

export const summitStatusBlockFragment = `
  fragment summitStatusBlock on contentBlocks_NeoField {
    ... on contentBlocks_summitStatus_BlockType {
      id
      typeHandle
      summitStatusLayout
    }
  }
`;

export const publicationsListBlockFragment = `
  fragment publicationsListBlock on contentBlocks_NeoField {
    ... on contentBlocks_publicationsList_BlockType {
      id
      typeHandle
      header
      publications: publication {
        ... on publications_publication_Entry {
          id
          title
          authorPub
          creditPub
          date
          externalUrl
        }
      }
      mixedLink {
        ${getLinkFields()}
      }
    }
  }
`;

export const peopleBlockFragment = `
  fragment peopleBlock on contentBlocks_NeoField {
    ... on contentBlocks_peopleBlock_BlockType {
      id
      typeHandle
      peopleLayout
      people {
        ... on people_person_Entry {
          id
          name: title
          personAffiliation
          ${cantoSingleAsset}
        }
      }
    }
  }
`;

export const imageBlockFragment = print(ImageBlockFragmentDoc);
export const ctaGridBlockFragment = print(CtaGridBlockFragmentDoc);
export const accordionGroupBlockFragment = print(
  AccordionGroupBlockFragmentDoc
);
export const shareBlockFragment = print(ShareBlockFragmentDoc);
export const textBlockFragment = print(TextBlockFragmentDoc);
export const videoBlockFragment = print(VideoBlockFragmentDoc);
export const keyNumbersBlockFragment = print(KeyNumbersBlockFragmentDoc);
export const skyviewerBlockFragment = print(SkyviewerBlockFragmentDoc);
export const linkedImageListFragment = print(LinkedImageListBlockFragmentDoc);
export const imageComparisonFragment = print(ImageComparisonBlockFragmentDoc);
export const firstLookWidgetsFragment = print(FirstLookWidgetsBlockFragmentDoc);

export const allPageBlocksFragment = `
${accordionGroupBlockFragment}
${calloutBlockFragment}
${complexTableBlockFragment}
${contactBlockFragment}
${ctaGridBlockFragment}
${imageGridBlockFragment}
${imageBlockFragment}
${investigationGridBlockFragment}
${linkBlockFragment}
${newsBlockFragment}
${relatedContentFragment}
${scheduleBlockFragment}
${shareBlockFragment}
${simpleTableBlockFragment}
${slideBlockFragment}
${staffGridFragment}
${tableGroupBlockFragment}
${textBlockFragment}
${videoBlockFragment}
${downloadListBlockFragment}
${embedBlockFragment}
${summitStatusBlockFragment}
${publicationsListBlockFragment}
${peopleBlockFragment}
${keyNumbersBlockFragment}
${skyviewerBlockFragment}
${linkedImageListFragment}
${imageComparisonFragment}
${firstLookWidgetsFragment}
`;

export const allPageBlocks = `
  ...accordionGroupBlock
  ...calloutBlock
  ...complexTableBlock
  ...contactBlock
  ...ctaGridBlock
  ...imageGridBlock
  ...imageBlock
  ...investigationGridBlock
  ...linkBlock
  ...newsBlock
  ...relatedContentBlock
  ...scheduleBlock
  ...shareBlock
  ...simpleTableBlock
  ...slideBlock
  ...staffGridBlock
  ...tableGroupBlock
  ...textBlock
  ...videoBlock
  ...downloadListBlock
  ...embedBlock
  ...summitStatusBlock
  ...publicationsListBlock
  ...peopleBlock
  ...keyNumbersBlock
  ...skyviewerBlock
  ...linkedImageListBlock
  ...imageComparisonBlock
  ...firstLookWidgetsBlock
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

export const imageBlockNewsFragment = print(ImageBlockNewsFragmentDoc);

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
              image: hero {
                ...on heroes_Asset {
                  ${getImageFields("crop", 900, 550)}
                }
              }
            }
            ...on news_post_Entry {
              date
              description: teaser
              image: hero {
                ...on heroes_Asset {
                  ${getImageFields("crop", 900, 550)}
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
      url: externalUrlTranslatable
    }
  }
`;

export const skyviewerBlockNewsFragment = print(SkyviewerNewsBlockFragmentDoc);

export const allNewsBlocksFragment = `
  ${textBlockNewsFragment}
  ${imageBlockNewsFragment}
  ${linkBlockNewsFragment}
  ${contactBlockNewsFragment}
  ${relatedContentNewsFragment}
  ${videoBlockNewsFragment}
  ${skyviewerBlockNewsFragment}
`;

export const allNewsBlocks = `
  ...textBlockNews
  ...imageBlockNews
  ...linkBlockNews
  ...contactBlockNews
  ...relatedContentBlockNews
  ...videoBlockNews
  ...skyviewerNewsBlock
`;
