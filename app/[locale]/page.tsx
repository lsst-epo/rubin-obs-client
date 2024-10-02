import { FunctionComponent } from "react";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { getEntrySectionTypeByUri, getEntryDataByUri } from "@/api/entry";
import { setEdcLog } from "@/lib/edc-log";
import { getSiteFromLocale } from "@/lib/helpers/site";
import { purgeNextjsStaticFiles } from "@/lib/purgeStaticFiles";
import HomePageTemplate from "@/templates/HomePage";
import { Metadata } from "next";
import { getEntryMetadataByUri } from "@/lib/api/metadata";

const CRAFT_HOMEPAGE_URI = "__home__";

export async function generateMetadata({
  params: { locale },
  searchParams = {},
}: LocaleProps): Promise<Metadata> {
  const uri = CRAFT_HOMEPAGE_URI;
  let previewToken: string | undefined;

  if (draftMode().isEnabled) {
    previewToken = Array.isArray(searchParams.preview)
      ? searchParams.preview[0]
      : searchParams?.preview;
  }

  const {
    entry: { title, description },
  } = await getEntryMetadataByUri(uri, locale, previewToken);

  return { title, description };
}

const RootPage: FunctionComponent<LocaleProps> = async ({
  params: { locale },
  searchParams = {},
}) => {
  const runId = Date.now().toString();
  const site = getSiteFromLocale(locale);
  const uri = CRAFT_HOMEPAGE_URI;
  let previewToken: string | undefined;

  if (draftMode().isEnabled) {
    previewToken = Array.isArray(searchParams.preview)
      ? searchParams.preview[0]
      : searchParams.preview;
  }

  const entrySectionType = await getEntrySectionTypeByUri(
    uri,
    site,
    previewToken
  );

  const { sectionHandle: section, typeHandle: type } = entrySectionType;
  const data = await getEntryDataByUri(uri, section, type, site, previewToken);

  const currentId = data?.id || data?.entry?.id;

  // Handle 404 if there is no data
  if (!currentId) {
    setEdcLog(runId, "404 encountered building for " + uri, "BUILD_ERROR_404");
    await purgeNextjsStaticFiles(locale);
    notFound();
  }

  setEdcLog(runId, "Done building for " + uri, "BUILD_COMPLETE");

  return <HomePageTemplate {...{ section, data }} />;
};

export default RootPage;
