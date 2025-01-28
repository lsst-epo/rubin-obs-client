import { FunctionComponent, ReactNode } from "react";
import Figure from "@rubin-epo/epo-react-lib/Figure";
import {
  CantoAssetAdditional,
  CantoAssetScheme,
} from "@/lib/api/galleries/schema";
import { assetCaption, assetTitle } from "@/lib/api/canto/metadata";
import { useTranslation } from "@/lib/i18n";
import SharePopup from "@/components/molecules/SharePopup";
import CantoDownload from "../CantoDownload";
import { CloseButton } from "./CantoFigure.client";
import styles from "./styles.module.css";
import Stack from "@rubin-epo/epo-react-lib/Stack";

interface CantoFigureProps {
  locale: string;
  name: string;
  additional: CantoAssetAdditional;
  downloadUrl: string;
  asset: ReactNode;
  width: number;
  height: number;
  id: string;
  parentUri: string;
  gallery: string;
  scheme: CantoAssetScheme;
  dateCreated: Date;
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
  scheme,
  dateCreated,
}) => {
  const { t } = await useTranslation(locale);
  const aspectRatio = width / height;
  const shortestSide = Math.min(width, height);
  const useHorizontalLayout = aspectRatio < 1 || shortestSide < 720;

  const additionalInfo = (
    <>
      <div className={styles.scheme}>{t(`gallery.${scheme}`)}</div>
      <div className="t-heading-tertiary">{assetTitle(additional, locale)}</div>
      <time className={styles.dateCreated} dateTime={dateCreated.toISOString()}>
        {new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(
          dateCreated
        )}
      </time>
    </>
  );

  const hasAdditionalInfo = scheme === "document";

  return (
    <Figure
      caption={
        <Stack space="var(--size-spacing-xs)">
          {hasAdditionalInfo && additionalInfo}
          <div>{assetCaption(additional, locale)}</div>
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
        </Stack>
      }
      layout={useHorizontalLayout ? "horizontal" : "vertical"}
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
