"server-only";
import PropTypes from "prop-types";
import { getLocale } from "next-intl/server";
import {
  Image,
  Text,
  Callout,
  Link,
  ComplexTable,
  Contact,
  ContactStaff,
  Share,
  SimpleTable,
  AccordionGroup,
  GridBlock,
  Schedule,
  SlideBlock,
  TableGroup,
  Video,
  DownloadList,
  Embed,
  SummitStatus,
  SummitStatusCompactView,
  PublicationsList,
  PeopleBlock,
  KeyNumbersGridBlock,
} from "@/content-blocks";
import SkyviewerBlock from "@/components/content-blocks/Skyviewer";
import LinkedImageListBlock from "@/components/content-blocks/LinkedImageList";
import ImageComparisonBlock from "@/components/content-blocks/ImageComparison";
import FirstLookWidgetsBlock from "@/components/content-blocks/FirstLookWidgets";

const blockMap = {
  accordionGroup: AccordionGroup,
  callout: Callout,
  complexTable: ComplexTable,
  contact: Contact,
  contactStaff: ContactStaff,
  ctaGrid: GridBlock,
  imageGrid: GridBlock,
  image: Image,
  link: Link,
  linkedAsset: Link,
  news: GridBlock,
  relatedContent: GridBlock,
  schedule: Schedule,
  share: Share,
  simpleTable: SimpleTable,
  slideBlock: SlideBlock,
  staffGrid: GridBlock,
  summitStatus: SummitStatus,
  summitStatusCompactView: SummitStatusCompactView,
  tableGroup: TableGroup,
  text: Text,
  video: Video,
  downloadList: DownloadList,
  investigationGrid: GridBlock,
  iframe: Embed,
  publicationsList: PublicationsList,
  peopleBlock: PeopleBlock,
  keyNumbersGrid: KeyNumbersGridBlock,
  skyviewer: SkyviewerBlock,
  linkedImageList: LinkedImageListBlock,
  imageComparison: ImageComparisonBlock,
  firstLookWidgets: FirstLookWidgetsBlock,
};

export default async function ContentBlockFactory({ type, data, pageId }) {
  const locale = await getLocale();
  const Block = blockMap[type];
  if (!Block) return null;
  return <Block {...data} pageId={pageId} locale={locale} />;
}

ContentBlockFactory.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  pageId: PropTypes.string.isRequired,
};
