import { FunctionComponent } from "react";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { pickFeaturedImage } from "@/lib/helpers/metadata";
import { getHomepage, getHomepageMetadata } from "@/lib/api/homepage";
import HomePageTemplate from "@/templates/HomePage";

export async function generateMetadata(
  { params: { locale }, searchParams = {} }: LocaleProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  let previewToken: string | undefined;

  if (draftMode().isEnabled) {
    previewToken = Array.isArray(searchParams.preview)
      ? searchParams.preview[0]
      : searchParams?.preview;
  }

  const { openGraph } = await parent;

  const {
    entry: { title, description, hero, cantoHero },
  } = await getHomepageMetadata(locale, previewToken);

  const images =
    (await pickFeaturedImage(hero[0], cantoHero[0])) || openGraph?.images;

  return {
    title,
    description,
    openGraph: {
      images,
    },
  };
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

  return <HomePageTemplate {...{ locale, data }} />;
};

export default RootPage;
