import { FunctionComponent, ReactNode } from "react";
import Figure from "@rubin-epo/epo-react-lib/Figure";
import { CantoAssetAdditional } from "@/lib/api/galleries/schema";
import { assetCaption } from "@/lib/api/canto/metadata";
import { useTranslation } from "@/lib/i18n";
import SharePopup from "@/components/layout/SharePopup";
import CantoDownload from "../CantoDownload";
import { CloseButton } from "./CantoFigure.client";
import styles from "./styles.module.css";

interface CantoFigureProps {
  locale: string;
  name: string;
  additional: CantoAssetAdditional;
  downloadUrl: string;
  asset: ReactNode;
  width: string;
  height: string;
  id: string;
  parentUri: string;
  gallery: string;
}

const CantoFigure: FunctionComponent<CantoFigureProps> = async ({
  asset,
  additional,
  downloadUrl,
  name,
  locale,
  width,
  height,
  id,
  parentUri,
  gallery,
}) => {
  const { t } = await useTranslation(locale);
  const aspectRatio = parseInt(width) / parseInt(height);

  return (
    <Figure
      caption={
        <>
          {assetCaption(additional, locale)}
          {additional?.Credit && (
            <div className={styles.credit}>
              {t("gallery.credit", {
                credit: additional.Credit,
              })}
            </div>
          )}
          <div className={styles.actionsRow}>
            <CantoDownload directUrlOriginal={downloadUrl} />
            <SharePopup title={name} url={`gallery/${gallery}/${id}`} />
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
        <CloseButton fallback={parentUri} />
      </div>
    </Figure>
  );
};

CantoFigure.displayName = "Organism.Gallery.CantoFigureProps";

export default CantoFigure;
