import PropTypes from "prop-types";
import styled from "styled-components";
import Body from "@/global/Body";
import Breadcrumbs from "@/components/page/Breadcrumbs";
import { Container } from "@rubin-epo/epo-react-lib";
import DynamicComponentFactory from "@/components/factories/DynamicComponentFactory";
import FilterBar from "@/components/page/FilterBar";
import { BREAK_PHABLET } from "@/styles/globalStyles";
import { FilterParamsProvider } from "@/contexts/FilterParams";
import useQueryParams from "@/lib/routing/useQueryParams";

export default function SearchPage({
  data: { description, dynamicComponent, id, title, uri },
}) {
  const bodyProps = {
    description,
    title,
  };
  const pageLink = {
    id,
    uri,
    title,
  };
  const { queryParams } = useQueryParams();
  const search = queryParams.get("search");
  const keyphrase =
    search &&
    search.replace("+", " ").replace(/(^|\s)\S/g, (t) => t.toUpperCase());

  return (
    <Body {...bodyProps}>
      <Breadcrumbs breadcrumbs={[pageLink]} />
      <FilterParamsProvider>
        <FilterBar filterType={dynamicComponent} />
        <Container bgColor="white" className="c-page-header">
          <Title>
            <h1>{title}</h1>
            {keyphrase && <h1>&quot;{keyphrase}&quot;</h1>}
          </Title>
        </Container>

        {dynamicComponent && (
          <DynamicComponentFactory
            componentType={dynamicComponent}
            pageId={id}
          />
        )}
      </FilterParamsProvider>
    </Body>
  );
}

const Title = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: ${BREAK_PHABLET}) {
    grid-template-columns: 1fr;
    grid-gap: 3rem;
  }
`;

SearchPage.displayName = "Template.SearchPage";

SearchPage.propTypes = {
  data: PropTypes.object,
};
