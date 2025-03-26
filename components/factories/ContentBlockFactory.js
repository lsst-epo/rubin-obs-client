"server-only";
import PropTypes from "prop-types";
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
  PublicationsList,
  PeopleBlock,
  KeyNumbersGridBlock,
} from "@/content-blocks";
import SkyviewerBlock from "@/components/content-blocks/Skyviewer";
import { getLocale } from "@/lib/i18n/server";

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
};

export default function ContentBlockFactory({ type, data, pageId }) {
  const locale = getLocale();
  const Block = blockMap[type];
  if (!Block) return null;
  return <Block {...data} pageId={pageId} locale={locale} />;
}

ContentBlockFactory.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  pageId: PropTypes.string.isRequired,
};
