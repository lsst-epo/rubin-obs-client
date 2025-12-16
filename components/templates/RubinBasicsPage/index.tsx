import { FunctionComponent } from "react";
import RubinBasicsPageClient from "./client";

const NewsPage: FunctionComponent<{
  section: string;
  data: PageEntry;
  locale: string;
}> = async ({ data, section, locale }) => {
  // Craft news entries
  return <RubinBasicsPageClient {...{ data, section, locale }} />;
};

export default NewsPage;
