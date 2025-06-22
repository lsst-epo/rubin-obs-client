import { FunctionComponent, Suspense } from "react";
import Stack from "@rubin-epo/epo-react-lib/Stack";
import MasonryGrid from "@rubin-epo/epo-react-lib/MasonryGrid";
import Buttonish from "@rubin-epo/epo-react-lib/Buttonish";
import { type IconKey } from "@rubin-epo/epo-react-lib/IconComposer";
import { getGalleryData } from "@/lib/api/galleries";
import { GalleryDataFilters } from "@/lib/api/galleries/schema";
import { assetAlt, assetTitle } from "@/lib/api/canto/metadata";
import { addLocaleUriSegment, useTranslation } from "@/lib/i18n";
import { getOffset } from "@/lib/utils/pagination";
import Pagination from "@/components/molecules/Pagination";
import LinkedImage from "@/components/molecules/LinkedImage";
import FilteredResults from "../FilteredResults";
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
  const data = await getGalleryData({ gallery, filters, locale });

  if (!data) {
    return (
      <>
        <FilteredResults total={0} {...{ filters }} />
        <Buttonish text={t("gallery.back-to-gallery")} url={gallery} />
      </>
    );
  }

  const { assetAlbum, total = 0 } = data;
  const { page, limit } = filters;

  if (assetAlbum.length === 0 || total === 0) {
    return (
      <>
        <FilteredResults {...{ filters, total }} />
        <Buttonish text={t("gallery.back-to-gallery")} url={gallery} />
      </>
    );
  }

  const icons: Record<string, IconKey> = {
    video: "Play",
  };

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
          <LinkedImage
            icon={icons[scheme]}
            link={{
              href: addLocaleUriSegment(
                locale,
                `/gallery/collections/${gallery}/${id}`
              ),
              prefetch: false,
            }}
            image={{
              width,
              height,
              id,
              src: directUrlPreview,
              sizes: `(max-width: 600px) 100vw`,
              alt: assetAlt(additional, locale),
              priority: i < 10,
              quality: 80,
            }}
            title={assetTitle(additional, locale) || name}
          />
        ),
      };
    }
  );

  return (
    <>
      <FilteredResults {...{ total, filters }} />
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
    <Stack space="var(--size-spacing-s)">
      <Suspense
        fallback={
          <>
            <FilteredResults {...{ filters }} />
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
    </Stack>
  );
};

export default PreviewGrid;
