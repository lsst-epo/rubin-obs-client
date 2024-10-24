import { FunctionComponent } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { getHomepage, getHomepageMetadata } from "@/lib/api/homepage";
import HomePageTemplate from "@/templates/HomePage";

export async function generateMetadata({
  params: { locale },
  searchParams = {},
}: LocaleProps): Promise<Metadata> {
  let previewToken: string | undefined;

  if (draftMode().isEnabled) {
    previewToken = Array.isArray(searchParams.preview)
      ? searchParams.preview[0]
      : searchParams?.preview;
  }

  const {
    entry: { title, description },
  } = await getHomepageMetadata(locale, previewToken);

  return { title, description, alternates: { canonical: "./" } };
}

const RootPage: FunctionComponent<LocaleProps> = async ({
  params: { locale },
  searchParams = {},
}) => {
  let previewToken: string | undefined;

  if (draftMode().isEnabled) {
    previewToken = Array.isArray(searchParams.preview)
      ? searchParams.preview[0]
      : searchParams.preview;
  }

  const data = await getHomepage(locale, previewToken);

  // Handle 404 if there is no data
  if (!data?.id) {
    notFound();
  }

  return <HomePageTemplate data={data} />;
};

export default RootPage;
