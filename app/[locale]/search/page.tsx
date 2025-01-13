import { FC } from "react";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { getSearchEntry } from "@/lib/api/search";
import { Container } from "@rubin-epo/epo-react-lib";
import DynamicComponentFactory from "@/components/factories/DynamicComponentFactory";
import FilterBar from "@/components/page/FilterBar";
import { FilterParamsProvider } from "@/contexts/FilterParams";

const SearchPage: FC<WithSearchParams<LocaleProps>> = async ({
  params: { locale },
  searchParams = {},
}) => {
  const { search } = searchParams;
  let previewToken: string | undefined;

  if (draftMode().isEnabled) {
    previewToken = Array.isArray(searchParams.preview)
      ? searchParams.preview[0]
      : searchParams?.preview;
  }

  const data = await getSearchEntry(locale, previewToken);

  if (!data) {
    notFound();
  }

  const { title, id, dynamicComponent } = data;
  const keyphrase =
    search &&
    search.replace("+", " ").replace(/(^|\s)\S/g, (t) => t.toUpperCase());

  return (
    <FilterParamsProvider>
      <FilterBar filterType={dynamicComponent} />
      <Container bgColor="white" className="c-page-header">
        <h1>{title}</h1>
        {keyphrase && <h1>&quot;{keyphrase}&quot;</h1>}
      </Container>

      {dynamicComponent && (
        <DynamicComponentFactory componentType={dynamicComponent} pageId={id} />
      )}
    </FilterParamsProvider>
  );
};

export default SearchPage;
