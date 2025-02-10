import { FunctionComponent } from "react";
import { getSlideshowDataByUri } from "@/lib/api/slideshows";
import SlideshowPageClient from "./client";

const SlideshowPage: FunctionComponent<{
  section: string;
  data: PageEntry;
  locale: string;
}> = async ({ data: { uri }, section, locale }) => {
  const data = await getSlideshowDataByUri(uri, locale);

  return <SlideshowPageClient {...{ data, section }} />;
};

export default SlideshowPage;
