import PropTypes from "prop-types";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ResponsiveImage, Figure } from "@rubin-epo/epo-react-lib";
import ReleaseAssets from "./ReleaseAssets";
import * as Styled from "./styles";

export default function MediaSection({
  contentBlockAssets = [],
  releaseImages = [],
  releaseVideos = [],
}) {
  const { t } = useTranslation();

  if (!contentBlockAssets && !releaseImages && !releaseVideos) return null;

  if (
    contentBlockAssets?.length === 0 &&
    releaseImages?.length === 0 &&
    releaseVideos?.length === 0
  )
    return null;

  return (
    <Styled.MediaSection title={t(`media`)}>
      {contentBlockAssets.map((asset, i) => {
        if (asset.image?.[0].url) {
          return (
            <Link key={i} prefetch={false} href={asset.image?.[0].url}>
              <Figure caption={asset.caption}>
                <ResponsiveImage image={asset.image?.[0]} ratio="8:5" />
              </Figure>
            </Link>
          );
        }
      })}
      <ReleaseAssets assets={[...releaseImages, ...releaseVideos]} />
    </Styled.MediaSection>
  );
}

MediaSection.propTypes = {
  contentBlockAssets: PropTypes.array,
  releaseImages: PropTypes.array,
  releaseVideos: PropTypes.array,
  releaseStockImages: PropTypes.array,
};
