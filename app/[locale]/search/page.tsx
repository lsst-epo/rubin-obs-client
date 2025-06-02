import { FC } from "react";
import { notFound } from "next/navigation";
import { getSearchPage } from "@/lib/api/search";
import DynamicComponentFactory from "@/components/factories/DynamicComponentFactory";
import FilterBar from "@/components/page/FilterBar";
import SearchHeader from "@/components/molecules/SearchHeader";
import { FilterParamsProvider } from "@/contexts/FilterParams";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: LocaleProps) {
  const data = await getSearchPage(locale);

  if (!data || !data.id) {
    notFound();
  }

  const { title } = data;

  return { title };
}

const SearchPage: FC<WithSearchParams<LocaleProps>> = async ({
  params: { locale },
}) => {
  setRequestLocale(locale);
  const data = await getSearchPage(locale);

  if (!data || !data.id) {
    notFound();
  }

  const { title, id, dynamicComponent } = data;

  return (
    <FilterParamsProvider>
      <FilterBar filterType={dynamicComponent} />

      <SearchHeader title={title!} locale={locale} />

      {dynamicComponent && (
        <DynamicComponentFactory componentType={dynamicComponent} pageId={id} />
      )}
    </FilterParamsProvider>
  );
};

export const dynamic = "error";

export default SearchPage;
