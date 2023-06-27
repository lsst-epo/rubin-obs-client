import PropTypes from "prop-types";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Body from "@/global/Body";
import Breadcrumbs from "@/components/page/Breadcrumbs";
import { Container } from "@rubin-epo/epo-react-lib";
import DynamicComponentFactory from "@/components/factories/DynamicComponentFactory";
import FilterBar from "@/components/page/FilterBar";
import { usePathData } from "@/lib/utils";
import { BREAK_PHABLET } from "@/styles/globalStyles";

export default function SearchPage({
  data: { description, dynamicComponent, id, title, uri },
}) {
  const { t } = useTranslation();
  const bodyProps = {
    description,
    title,
  };
  const pageLink = {
    id,
    uri,
    title,
    active: true,
  };
  const { query } = usePathData();
  const keyphrase =
    query.search &&
    query.search.replace("+", " ").replace(/(^|\s)\S/g, (t) => t.toUpperCase());

  return (
    <Body {...bodyProps}>
      <Breadcrumbs breadcrumbs={[pageLink]} />
      <FilterBar filterType={dynamicComponent} />
      <Container bgColor="white" className="c-page-header">
        <Title>
          <h1>{title}</h1>
          {keyphrase && <h1>&quot;{keyphrase}&quot;</h1>}
        </Title>
      </Container>

      {dynamicComponent && (
        <DynamicComponentFactory componentType={dynamicComponent} pageId={id} />
      )}
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
