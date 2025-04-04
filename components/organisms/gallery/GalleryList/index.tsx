import { FC } from "react";
import Container from "@rubin-epo/epo-react-lib/Container";
import { getAllGalleries, getMainGallery } from "@/lib/api/galleries";
import { getLocale } from "@/lib/i18n/server";
import styles from "./styles.module.css";
import Link from "next/link";
import { addLocaleUriSegment, useTranslation } from "@/lib/i18n";
import clsx from "clsx";

interface GalleryListProps {
  currentGallery: string;
}

const GalleryList: FC<GalleryListProps> = async ({ currentGallery }) => {
  const locale = getLocale();
  const mainGallery = await getMainGallery(locale);
  const galleries = await getAllGalleries(locale);
  const { t } = await useTranslation(locale);
  const mainGalleryIndex = galleries.findIndex(
    (gallery) => gallery.slug === mainGallery?.gallery
  );

  if (galleries?.length < 1) {
    return null;
  }

  if (mainGalleryIndex > -1) {
    galleries.unshift(...galleries.splice(mainGalleryIndex, 1));
  }

  return (
    <Container
      width="wide"
      paddingSize="medium"
      bgColor="color-rubin-gray-300"
      className={styles.gallerySection}
    >
      <span className={clsx("t-heading-tertiary", styles.listTitle)}>
        {t("gallery.plural-gallery")}
      </span>
      <ul className={styles.galleryList}>
        {galleries.map(({ id, title, uri }, i) => {
          return id && title && uri ? (
            <li key={id}>
              <Link
                className={styles.galleryLink}
                href={addLocaleUriSegment(locale, i === 0 ? "gallery" : uri)}
                data-active={uri.includes(currentGallery)}
              >
                {title}
              </Link>
            </li>
          ) : null;
        })}
      </ul>
    </Container>
  );
};

GalleryList.displayName = "Organism.Gallery.GalleryList";

export default GalleryList;
