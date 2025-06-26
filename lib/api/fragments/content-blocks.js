import { cantoAssetSingleFragment } from "@/api/fragments/image";
import { print } from "graphql";
import {
  SkyviewerBlockFragmentDoc,
  ShareBlockFragmentDoc,
  LinkedImageListBlockFragmentDoc,
  ImageComparisonBlockFragmentDoc,
  ImageBlockFragmentDoc,
  TextBlockFragmentDoc,
  VideoBlockFragmentDoc,
  FirstLookWidgetsBlockFragmentDoc,
  AccordionGroupBlockFragmentDoc,
  CtaGridBlockFragmentDoc,
  KeyNumbersBlockFragmentDoc,
  RelatedContentBlockFragmentDoc,
  ScheduleBlockFragmentDoc,
  CalloutBlockFragmentDoc,
  ComplexTableBlockFragmentDoc,
  TableGroupBlockFragmentDoc,
  ContactBlockFragmentDoc,
  ImageGridBlockFragmentDoc,
  InvestigationGridBlockFragmentDoc,
  LinkBlockFragmentDoc,
  NewsBlockFragmentDoc,
  SimpleTableBlockFragmentDoc,
  SlideBlockFragmentDoc,
  StaffGridBlockFragmentDoc,
  DownloadListBlockFragmentDoc,
  EmbedBlockFragmentDoc,
  PeopleBlockFragmentDoc,
  PublicationsListBlockFragmentDoc,
  SummitStatusBlockFragmentDoc,
} from "@/gql/graphql";
import { gql } from "@urql/core";

/// ///////////////////////////////////////////
///   Page Content Blocks
/// ///////////////////////////////////////////

export const calloutBlockFragment = gql(print(CalloutBlockFragmentDoc));
export const complexTableBlockFragment = gql(
  print(ComplexTableBlockFragmentDoc)
);
export const tableGroupBlockFragment = gql(print(TableGroupBlockFragmentDoc));
export const contactBlockFragment = gql(print(ContactBlockFragmentDoc));
export const imageGridBlockFragment = gql(print(ImageGridBlockFragmentDoc));
export const investigationGridBlockFragment = gql(
  print(InvestigationGridBlockFragmentDoc)
);
export const linkBlockFragment = gql(print(LinkBlockFragmentDoc));
export const newsBlockFragment = gql(print(NewsBlockFragmentDoc));
export const relatedContentFragment = gql(
  print(RelatedContentBlockFragmentDoc)
);
export const simpleTableBlockFragment = gql(print(SimpleTableBlockFragmentDoc));
export const slideBlockFragment = gql(print(SlideBlockFragmentDoc));

export const staffGridFragment = gql(print(StaffGridBlockFragmentDoc));

export const downloadListBlockFragment = gql(
  print(DownloadListBlockFragmentDoc)
);

export const embedBlockFragment = gql(print(EmbedBlockFragmentDoc));

export const summitStatusBlockFragment = gql(
  print(SummitStatusBlockFragmentDoc)
);

export const publicationsListBlockFragment = gql(
  print(PublicationsListBlockFragmentDoc)
);

export const peopleBlockFragment = gql(print(PeopleBlockFragmentDoc));

export const imageBlockFragment = gql(print(ImageBlockFragmentDoc));
export const ctaGridBlockFragment = gql(print(CtaGridBlockFragmentDoc));
export const accordionGroupBlockFragment = gql(
  print(AccordionGroupBlockFragmentDoc)
);
export const shareBlockFragment = print(ShareBlockFragmentDoc);
export const textBlockFragment = print(TextBlockFragmentDoc);
export const videoBlockFragment = print(VideoBlockFragmentDoc);
export const keyNumbersBlockFragment = print(KeyNumbersBlockFragmentDoc);
export const skyviewerBlockFragment = print(SkyviewerBlockFragmentDoc);
export const linkedImageListFragment = print(LinkedImageListBlockFragmentDoc);
export const imageComparisonFragment = print(ImageComparisonBlockFragmentDoc);
export const firstLookWidgetsFragment = print(FirstLookWidgetsBlockFragmentDoc);
export const scheduleBlockFragment = print(ScheduleBlockFragmentDoc);

export const allPageBlocksFragment = gql`
  ${cantoAssetSingleFragment}
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
fragment ContentBlocks on contentBlocks_NeoField {
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
}
`;
