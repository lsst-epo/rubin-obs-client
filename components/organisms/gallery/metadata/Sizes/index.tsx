import { FunctionComponent } from "react";
import Link from "next/link";
import { generateAllPreviewSizes } from "@/lib/api/canto/resize";
import MetadataSection from "../Section";
import styles from "./styles.module.css";
import { getLocale } from "@/lib/i18n/server";
import { useTranslation } from "@/lib/i18n";

interface ImageSizesProps {
  directUrlOriginal: string;
  directUrlPreview: string;
  width: number;
  height: number;
}

const ImageSizes: FunctionComponent<ImageSizesProps> = async ({
  directUrlOriginal,
  directUrlPreview,
  width,
  height,
}) => {
  const locale = getLocale();
  const { t } = await useTranslation(locale);
  const sizes = generateAllPreviewSizes(directUrlPreview, width, height);

  const labelFromSize = (width: number, height: number) => {
    const longest = Math.max(width, height);

    if (longest <= 100) {
      return t("gallery.thumbnail");
    }

    if (longest < 500) {
      return t("gallery.small");
    }

    if (longest < 1024) {
      return t("gallery.medium");
    }

    return t("gallery.large");
  };

  return (
    <MetadataSection
      title={t("gallery.available-sizes")}
      metadata={
        <ul>
          {sizes.map(({ url, width, height }) => {
            return (
              <li className={styles.sizeItem} key={url}>
                <Link href={url} rel="alternate" target="_blank">
                  {labelFromSize(width, height)}
                </Link>
                <span>
                  ({width} × {height})
                </span>
              </li>
            );
          })}
          <li className={styles.sizeItem}>
            <Link href={directUrlOriginal} rel="alternate" target="_blank">
              {t("gallery.original")}
            </Link>
            <span>
              ({width} × {height})
            </span>
          </li>
        </ul>
      }
    />
  );
};

ImageSizes.displayName = "Organism.Gallery.Metadata.Sizes";

export default ImageSizes;
