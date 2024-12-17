import { FunctionComponent, ReactNode } from "react";
import Figure from "@rubin-epo/epo-react-lib/Figure";
import { damAssetToImage } from "@/lib/api/canto";
import { CantoAssetAdditional } from "@/lib/api/galleries/schema";
import { assetCaption } from "@/lib/api/canto/metadata";
import SharePopup from "@/components/layout/SharePopup";
import CantoDownload from "../CantoDownload";
import styles from "./styles.module.css";

interface CantoFigureProps {
  locale: string;
  name: string;
  additional: CantoAssetAdditional;
  downloadUrl: string;
  asset: ReactNode;
  location: string;
  width: string;
  height: string;
}

const CantoFigure: FunctionComponent<CantoFigureProps> = ({
  asset,
  additional,
  downloadUrl,
  name,
  locale,
  location,
  width,
  height,
}) => {
  const aspectRatio = parseInt(width) / parseInt(height);
  return (
    <Figure
      caption={
        <>
          {assetCaption(additional, locale)}
          <div className={styles.actionsRow}>
            <CantoDownload directUrlOriginal={downloadUrl} />
            <SharePopup title={name} url={location} />
          </div>
        </>
      }
      layout={aspectRatio < 1 ? "horizontal" : "vertical"}
      withBackground
    >
      <div
        className={styles.imageWrapper}
        style={{
          "--w": `${width}px`,
          "--h": `${height}px`,
        }}
      >
        {asset}
      </div>
    </Figure>
  );
};

CantoFigure.displayName = "Organism.Gallery.CantoFigureProps";

export default CantoFigure;
