import { FC } from "react";
import { useTranslation } from "@/lib/i18n";
import { Image } from "@/services/noirlab";
import MetadataSection from "../metadata/Section";
import styles from "./styles.module.css";

interface NOIRLabImageSizesProps {
  locale: string;
  resources: Image["resources"];
  formats: Image["formats"];
}

const WALLPAPER_SIZES = [
  { width: 1024, height: 768 },
  { width: 1280, height: 1024 },
  { width: 1600, height: 1200 },
  { width: 1920, height: 1200 },
  { width: 2048, height: 1536 },
];

const NOIRLabImageSizes: FC<NOIRLabImageSizesProps> = async ({
  resources,
  formats,
  locale,
}) => {
  const { t } = await useTranslation(locale);
  const externalLinkAttrs = {
    rel: "alternate noopener noreferrer",
    target: "_blank",
  };

  const {
    zoomable,
    wallpaper1,
    wallpaper2,
    wallpaper3,
    wallpaper4,
    wallpaper5,
  } = formats;

  const wallpapers: Array<{ width: number; height: number; url: string }> = [];

  Object.entries({
    wallpaper1,
    wallpaper2,
    wallpaper3,
    wallpaper4,
    wallpaper5,
  }).forEach(([key, value]) => {
    const index = parseInt(key.slice(-1)) - 1;

    if (value) {
      wallpapers.push({ ...WALLPAPER_SIZES[index], url: value });
    }
  });

  return (
    <>
      <MetadataSection
        title={t("gallery.available-sizes")}
        metadata={
          <ul>
            {resources.map(({ URL, Dimensions, ResourceType }) => {
              if (!URL || !Dimensions) return null;

              const [width, height] = Dimensions;
              return (
                <li key={URL} className={styles.sizeItem}>
                  <a {...externalLinkAttrs} href={URL}>
                    {ResourceType}
                  </a>
                  <span>
                    ({width} × {height})
                  </span>
                </li>
              );
            })}
          </ul>
        }
      />
      {zoomable && (
        <MetadataSection
          title={t("gallery.zoomable")}
          metadata={
            <ul>
              <li className={styles.sizeItem}>
                <a {...externalLinkAttrs} href={zoomable}>
                  {t("gallery.zoomable")}
                </a>
              </li>
            </ul>
          }
        />
      )}
      {zoomable && (
        <MetadataSection
          title={t("gallery.wallpapers")}
          metadata={
            <ul>
              {wallpapers.map(({ width, height, url }) => {
                return (
                  <li key={url} className={styles.sizeItem}>
                    <a {...externalLinkAttrs} href={url}>
                      {width} × {height}
                    </a>
                  </li>
                );
              })}
            </ul>
          }
        />
      )}
    </>
  );
};

NOIRLabImageSizes.displayName = "Organism.Gallery.NOIRLabImageSizes";

export default NOIRLabImageSizes;
