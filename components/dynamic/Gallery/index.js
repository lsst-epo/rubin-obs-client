import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { MasonryGrid } from "@rubin-epo/epo-react-lib";
import { usePathData, normalizePathData } from "@/lib/utils";
import DataList from "@/dynamic/DataList";

const gridifyAlbum = (album) =>
  album.map((asset) => {
    const {
      id,
      height,
      width,
      metadata: { AltTextEN, AltTextES, TitleEN, TitleES },
      url: { directUrlPreview },
    } = asset;

    return {
      id,
      uri: id,
      image: [
        {
          title: TitleEN,
          altText: AltTextEN,
          url: directUrlPreview,
          height,
          width,
        },
      ],
    };
  });

const Gallery = ({ excludeId = null, limit = 20, component }) => {
  const { t } = useTranslation();
  const { asPath, query } = usePathData();
  const { pathname, pathParams } = normalizePathData(asPath);
  const page = query?.page ? query.page : 1;
  const router = useRouter();

  return (
    <DataList
      excludeId={excludeId}
      limit={limit}
      section="gallery"
      component={component}
      width="regular"
      loaderDescription={t("gallery.loading")}
    >
      {({ globalSet: { galleryEntryPaginated, galleryEntryAll } }) => {
        const { cantoAlbum } = galleryEntryPaginated[0];
        const totalCount = galleryEntryAll[0]?.cantoAlbum?.length;
        const gridifiedAlbum = gridifyAlbum(cantoAlbum);

        return (
          <>
            {gridifiedAlbum?.length > 0 && (
              <MasonryGrid items={gridifiedAlbum}></MasonryGrid>
            )}
          </>
        );
      }}
    </DataList>
  );
};

Gallery.propTypes = {
  excludeId: PropTypes.string,
  limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  component: PropTypes.node,
};

export default Gallery;
