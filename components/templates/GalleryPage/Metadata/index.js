import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import snakeCase from "lodash/snakeCase";
import * as Styled from "./styles";

function Metadata({ data }) {
  const { t } = useTranslation();
  const keys = Object.keys(data).filter((property) => Boolean(data[property]));

  return keys.map((property) => (
    <Styled.Wrapper key={property}>
      <Styled.Term>{t(`gallery.metadata.${snakeCase(property)}`)}</Styled.Term>
      <Styled.Definition
        dangerouslySetInnerHTML={{ __html: data[property] }}
        className="c-content-rte"
      />
    </Styled.Wrapper>
  ));
}

Metadata.displayName = "Template.GalleryPage.Metadata";

Metadata.propTypes = {
  data: PropTypes.object,
};

export default Metadata;
