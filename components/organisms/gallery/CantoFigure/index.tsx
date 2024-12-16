import { FunctionComponent } from "react";
import { damAssetToImage } from "@/lib/api/canto";
import { assetCaption } from "@/lib/api/canto/metadata";
import Image from "@rubin-epo/epo-react-lib/Image";
import Buttonish from "@rubin-epo/epo-react-lib/Buttonish";
import Figure from "@rubin-epo/epo-react-lib/Figure";
import Stack from "@rubin-epo/epo-react-lib/Stack";
import SharePopup from "@/components/layout/SharePopup";
import { CantoDetailedAsset } from "types/canto";
import styles from "./styles.module.css";
import CantoDownload from "../CantoDownload";

interface CantoFigureProps {
  locale: string;
  asset: CantoDetailedAsset;
}

const CantoFigure: FunctionComponent<CantoFigureProps> = ({
  asset,
  locale,
}) => {
  const image = damAssetToImage(locale, asset);

  if (!image) return null;

  const { width, height, src, srcSet, alt } = image;

  return (
    <Figure
      caption={
        <Stack>
          <div>{assetCaption(asset, locale)}</div>
          <div className={styles.actionsRow}>
            <CantoDownload
              id={asset.id}
              fileName={asset.name}
              directUrlOriginal={asset.url.directUrlOriginal}
            />
            <SharePopup title={asset.name} url="sdfsdfsdfs" />
          </div>
        </Stack>
      }
      withBackground
    >
      <Image image={{ width, height, srcSet, altText: alt, url: src }} />
    </Figure>
  );
};

CantoFigure.displayName = "Organism.Gallery.CantoFigure";

export default CantoFigure;
