import { FunctionComponent, ReactNode } from "react";
import Figure from "@rubin-epo/epo-react-lib/Figure";
import IconComposer from "@rubin-epo/epo-react-lib/IconComposer";
import { CantoAssetAdditional } from "@/lib/api/galleries/schema";
import { assetCaption } from "@/lib/api/canto/metadata";
import { useTranslation } from "@/lib/i18n";
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

const CantoFigure: FunctionComponent<CantoFigureProps> = async ({
  asset,
  additional,
  downloadUrl,
  name,
  locale,
  location,
  width,
  height,
}) => {
  const { t } = await useTranslation(locale);
  const aspectRatio = parseInt(width) / parseInt(height);
  const { origin, pathname } = new URL(location);
  const parentLocation = `${origin}${pathname
    .split("/")
    .slice(0, -1)
    .join("/")}`;

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
        <a
          className={styles.closeLink}
          href={parentLocation}
          title={t("gallery.back-to-gallery")}
        >
          <IconComposer icon="close" />
          <span className="a-hidden">{t("gallery.back-to-gallery")}</span>
        </a>
      </div>
    </Figure>
  );
};

CantoFigure.displayName = "Organism.Gallery.CantoFigureProps";

export default CantoFigure;
