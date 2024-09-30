import { FunctionComponent } from "react";
import { getSlideshowDataByUri } from "@/lib/api/slideshows";
import SlideshowPageClient from "./client";

const SlideshowPage: FunctionComponent<{
  section: string;
  data: PageEntry;
  locale: string;
  previewToken?: string;
}> = async ({ data: { uri }, section, locale, previewToken }) => {
  const data = await getSlideshowDataByUri(uri, locale, previewToken);

  return <SlideshowPageClient {...{ data, section }} />;
};

export default SlideshowPage;
