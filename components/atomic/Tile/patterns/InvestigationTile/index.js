import PropTypes from "prop-types";
import { useUID } from "react-uid";
import { Image } from "@rubin-epo/epo-react-lib";
import * as Styled from "./styles";
import { useTranslation } from "react-i18next";
import { imageShaper } from "@/lib/utils";

const InvestigationTile = ({ investigation, useExternalLink }) => {
  const uid = useUID();

  const { t } = useTranslation();
  const { cantoAssetSingle, status, title, externalUrl, landingPage } =
    investigation || {};
  const image = imageShaper("EN", cantoAssetSingle?.[0]);
  const url = useExternalLink ? externalUrl : landingPage?.[0]?.uri;
  const isInactive = status === "inactive";

  return (
    investigation && (
      <Styled.MixedLink
        aria-labelledby={uid}
        aria-disabled={isInactive}
        url={url}
      >
        <Styled.Image>{image && <Image image={image} />}</Styled.Image>
        {title && (
          <Styled.Title id={uid}>
            <span>
              {title}
              {isInactive && <div>{t("investigation.coming_soon")}</div>}
            </span>
          </Styled.Title>
        )}
        {status === "earlyAccess" && <Styled.EarlyAccessFlag />}
      </Styled.MixedLink>
    )
  );
};

InvestigationTile.propTypes = {
  className: PropTypes.string,
  useExternalLink: PropTypes.bool,
  investigation: PropTypes.shape({
    uri: PropTypes.string,
    title: PropTypes.string,
    cantoAssetSingle: PropTypes.array,
    externalUrl: PropTypes.string,
    status: PropTypes.string,
    landingPage: PropTypes.arrayOf(
      PropTypes.shape({
        uri: PropTypes.string,
        title: PropTypes.string,
      })
    ),
  }),
};

export default InvestigationTile;
