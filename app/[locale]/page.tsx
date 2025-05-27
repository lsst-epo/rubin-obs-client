import { FunctionComponent } from "react";
import { notFound } from "next/navigation";
import { getHomepage } from "@/lib/api/homepage";
import HomePageTemplate from "@/templates/HomePage";
import { setRequestLocale } from "next-intl/server";

const RootPage: FunctionComponent<LocaleProps> = async ({
  params: { locale },
}) => {
  setRequestLocale(locale);
  const data = await getHomepage(locale);

  // Handle 404 if there is no data
  if (!data?.id) {
    notFound();
  }

  return <HomePageTemplate data={data} locale={locale} />;
};

export default RootPage;
