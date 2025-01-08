import { FunctionComponent, Suspense } from "react";
import Image from "next/image";
import MasonryGrid from "@rubin-epo/epo-react-lib/MasonryGrid";
import MasonryImage from "@rubin-epo/epo-react-lib/MasonryImage";
import Buttonish from "@rubin-epo/epo-react-lib/Buttonish";
import Stack from "@rubin-epo/epo-react-lib/Stack";
import { getGalleryData } from "@/lib/api/galleries";
import { GalleryDataFilters } from "@/lib/api/galleries/schema";
import { assetAlt, assetTitle } from "@/lib/api/canto/metadata";
import { useTranslation } from "@/lib/i18n";
import { getOffset } from "@/lib/utils/pagination";
import Pagination from "@/components/molecules/Pagination";
import styles from "./styles.module.css";
interface PreviewGridProps {
  gallery: string;
  locale: string;
  filters: GalleryDataFilters;
}

const PreviewGridContent: FunctionComponent<PreviewGridProps> = async ({
  gallery,
  locale,
  filters,
}) => {
  const { t } = await useTranslation(locale);
  const data = await getGalleryData(gallery, locale, filters);

  if (!data) {
    return null;
  }

  const { assetAlbum, total } = data;
  const { page, limit } = filters;

  if (assetAlbum.length === 0 || total === 0) {
    return (
      <Stack>
        <p>{t("search-no-results")}</p>
        <Buttonish text={t("gallery.back-to-gallery")} url={gallery} />
      </Stack>
    );
  }

  const items = assetAlbum.map(
    (
      {
        id,
        scheme,
        width,
        height,
        url: { directUrlPreview },
        additional,
        name,
      },
      i
    ) => {
      return {
        id,
        element: (
          <MasonryImage
            linkProps={{
              href: `${gallery}/${id}`,
            }}
            isVideo={scheme === "video"}
          >
            <Image
              id={id}
              width={parseInt(width)}
              height={parseInt(height)}
              src={directUrlPreview}
              sizes={`(max-width: 600px) 100vw`}
              alt={assetAlt(additional, locale)}
              title={assetTitle(additional, locale) || name}
              priority={i < 10}
              quality={80}
            />
          </MasonryImage>
        ),
      };
    }
  );

  return (
    <>
      <MasonryGrid items={items} />
      <Pagination
        limit={limit}
        page={page}
        total={total}
        offset={getOffset(limit, page)}
      />
    </>
  );
};

const PreviewGrid: FunctionComponent<PreviewGridProps> = ({
  filters,
  ...props
}) => {
  const { limit, page } = filters;
  const fallbackTiles = new Array(limit)
    .fill({ element: <div className={styles.skeletonTile} /> })
    .map((item, i) => {
      return { ...item, id: i };
    });

  return (
    <Suspense
      fallback={
        <>
          <MasonryGrid items={fallbackTiles} />
          <Pagination
            limit={limit}
            page={page}
            total={0}
            offset={getOffset(limit, page)}
          />
        </>
      }
    >
      <PreviewGridContent {...{ filters, ...props }} />
    </Suspense>
  );
};

export default PreviewGrid;
