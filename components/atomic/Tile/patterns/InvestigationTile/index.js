import PropTypes from "prop-types";
import { useUID } from "react-uid";
import Image from "@/atomic/Image";
import * as Styled from "./styles";
import { useTranslation } from "react-i18next";

const InvestigationTile = ({ investigation, useExternalLink }) => {
  const uid = useUID();

  const { t } = useTranslation();

  if (!investigation) return null;

  const { image, isActive, title, externalUrl, landingPage } = investigation;

  const finalImage = image?.[0];

  const url = useExternalLink ? externalUrl : landingPage?.[0]?.uri;

  return (
    <Styled.MixedLink aria-labelledby={uid} aria-disabled={!isActive} url={url}>
      <Styled.Image>{finalImage && <Image image={finalImage} />}</Styled.Image>
      {title && (
        <Styled.Title id={uid}>
          <span>
            {title}
            {!isActive && <div>{t("investigation.coming_soon")}</div>}
          </span>
        </Styled.Title>
      )}
    </Styled.MixedLink>
  );
};

InvestigationTile.propTypes = {
  className: PropTypes.string,
  useExternalLink: PropTypes.bool,
  investigation: PropTypes.shape({
    uri: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.object,
    externalUrl: PropTypes.string,
    isActive: PropTypes.bool,
    landingPage: PropTypes.shape({
      uri: PropTypes.string,
      title: PropTypes.string,
    }),
  }),
};

export default InvestigationTile;
