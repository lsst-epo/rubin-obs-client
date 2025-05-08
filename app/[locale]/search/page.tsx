import { FC } from "react";
import { notFound } from "next/navigation";
import Container from "@rubin-epo/epo-react-lib/Container";
import { getSearchPage } from "@/lib/api/search";
import DynamicComponentFactory from "@/components/factories/DynamicComponentFactory";
import FilterBar from "@/components/page/FilterBar";
import { FilterParamsProvider } from "@/contexts/FilterParams";

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
  searchParams = {},
}) => {
  const { search } = searchParams;

  const data = await getSearchPage(locale);

  if (!data || !data.id) {
    notFound();
  }

  const searchString = Array.isArray(search) ? search[0] : search;

  const { title, id, dynamicComponent } = data;
  const keyphrase = searchString
    ?.replace("+", " ")
    .replace(/(^|\s)\S/g, (t) => t.toLocaleUpperCase(locale));

  return (
    <FilterParamsProvider>
      <FilterBar filterType={dynamicComponent} />
      <Container className="c-page-header">
        <h1>
          {title}
          {keyphrase && <span>&nbsp;&quot;{keyphrase}&quot;</span>}
        </h1>
      </Container>

      {dynamicComponent && (
        <DynamicComponentFactory componentType={dynamicComponent} pageId={id} />
      )}
    </FilterParamsProvider>
  );
};

export const dynamic = "force-dynamic";

export default SearchPage;
