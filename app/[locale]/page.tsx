import { FunctionComponent } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHomepage, getHomepageMetadata } from "@/lib/api/homepage";
import HomePageTemplate from "@/templates/HomePage";

export async function generateMetadata({
  params: { locale },
}: LocaleProps): Promise<Metadata> {
  const {
    entry: { title, description },
  } = await getHomepageMetadata(locale);

  return { title, description };
}

const RootPage: FunctionComponent<LocaleProps> = async ({
  params: { locale },
}) => {
  const data = await getHomepage(locale);

  // Handle 404 if there is no data
  if (!data?.id) {
    notFound();
  }

  return <HomePageTemplate data={data} />;
};

export default RootPage;
