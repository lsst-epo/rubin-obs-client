import { FunctionComponent } from "react";
import { notFound } from "next/navigation";
import { getHomepage } from "@/lib/api/homepage";
import HomePageTemplate from "@/templates/HomePage";
import { setRequestLocale } from "next-intl/server";
import { getOrganizationData } from "@/services/craft/globals/organization";
import StructuredData from "@/components/atomic/StructuredData";

const RootPage: FunctionComponent<LocaleProps> = async ({
  params: { locale },
}) => {
  setRequestLocale(locale);

  const [data, organization] = await Promise.all([
    getHomepage(locale),
    getOrganizationData(),
  ]);

  // Handle 404 if there is no data
  if (!data || data.__typename !== "homepage_homepage_Entry" || !data.id) {
    notFound();
  }

  return (
    <>
      <StructuredData jsonLd={organization} />
      <HomePageTemplate data={data} locale={locale} />
    </>
  );
};

export const dynamic = "force-dynamic";

export default RootPage;
