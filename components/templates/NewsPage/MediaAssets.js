import PropTypes from "prop-types";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ResponsiveImage } from "@rubin-epo/epo-react-lib";
import ReleaseAssets from "./ReleaseAssets";
import * as Styled from "./styles";

export default function MediaAssets({
  contentBlockAssets,
  releaseImages,
  releaseVideos,
  releaseStockImages,
}) {
  const { t } = useTranslation();

  if (
    !contentBlockAssets &&
    !releaseImages &&
    !releaseVideos &&
    !releaseStockImages
  )
    return null;

  if (
    contentBlockAssets?.length <= 0 &&
    releaseImages?.length <= 0 &&
    releaseVideos?.length <= 0 &&
    releaseStockImages?.length <= 0
  )
    return null;
  return (
    <Styled.AsideSecondary>
      <h3>{t(`media`)}</h3>
      {contentBlockAssets.map((asset, i) => {
        if (asset.image?.[0].url) {
          return (
            <Link key={i} prefetch={false} href={asset.image?.[0].url}>
              <ResponsiveImage image={asset.image?.[0]} ratio="8:5" />
            </Link>
          );
        }
      })}
      <ReleaseAssets assets={releaseImages} />
      <ReleaseAssets assets={releaseVideos} />
      <ReleaseAssets assets={releaseStockImages} />
    </Styled.AsideSecondary>
  );
}

MediaAssets.propTypes = {
  contentBlockAssets: PropTypes.array,
  releaseImages: PropTypes.array,
  releaseVideos: PropTypes.array,
  releaseStockImages: PropTypes.array,
};
