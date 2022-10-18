import PropTypes from "prop-types";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useGlobalData } from "@/lib/utils";
import { shapeGalleryAssetData } from "@/lib/api/gallery";
import * as Styled from "./styles";

function getWidthArray(limit) {
  const widthMap = [0.25, 0.25, 0.25, 0.25, 0.333, 0.333, 0.333, 0.5, 0.5, 1];
  const repeats = Math.round(limit / widthMap.length);
  return Array(repeats).fill(widthMap).flat();
}

function getColumnCount(index, limit) {
  const widthArray = getWidthArray(limit);
  const decimal = widthArray[index];
  return Math.round(1 / decimal);
}

function template(i, width) {
  const percent = `${Math.round(width * 10000) / 100}%`;
  const columns = Math.round(1 / width);
  return `
    > :nth-child(${i + 1}n + ${i + 1}) {
      flex-basis: calc(${percent} - var(--gap) * ${columns - 1});
    }
  `;
}

function getTileSizes(limit) {
  const widthArray = getWidthArray(limit);
  let str = "";
  for (let i = 0; i < limit - 1; i++) {
    const width = widthArray[i];
    str += template(i, width);
  }
  return str;
}

const Tile = ({ media, scheme, link, title, index, limit }) => {
  const containerWidth = 1160;
  const columns = getColumnCount(index, limit);
  return (
    <Link href={link} passHref>
      <Styled.TileLink aria-label={title}>
        <Styled.Image
          {...media}
          url={scheme === "video" ? media.poster : media.url}
          layout="fill"
          sizes={`
            ${Math.round(containerWidth / columns)}px,
            (max-width: 1359px) calc(100vw / ${columns} - 2rem),
            (max-width: 968px) calc(100vw / ${Math.max(1, columns - 1)} - 2rem),
            (max-width: 678px) calc(100vw / ${Math.max(1, columns - 2)} - 2rem),
            (max-width: 456px) calc(100vw - 40px)
          `}
        />
        {scheme === "video" && <Styled.Icon icon="play" />}
      </Styled.TileLink>
    </Link>
  );
};

export default function MasonryGrid({ items, limit = 10, isLoading = false }) {
  const {
    localeInfo: { language },
  } = useGlobalData();
  const { t } = useTranslation();
  const skeleton = [...Array(limit).keys()].map((_, index) => {
    return <Styled.SkeletonTile key={index} aria-hidden />;
  });

  return (
    <Styled.Grid
      role="region"
      aria-label={t("gallery.results")}
      aria-busy={isLoading}
      $childSizes={getTileSizes(limit)}
    >
      {isLoading && (
        <>
          {skeleton}
          <span className="a-hidden">{t("gallery.loading")}</span>
        </>
      )}
      {!isLoading &&
        items.map((item, index) => {
          const { id, uri, scheme, title, media } = shapeGalleryAssetData({
            assetData: item,
            language,
          });
          return (
            <Tile
              key={id}
              index={index}
              media={media}
              link={uri}
              title={title}
              scheme={scheme}
              limit={limit}
            />
          );
        })}
    </Styled.Grid>
  );
}

Tile.displayName = "GalleryList.MasonryGrid.Tile";

Tile.propTypes = {
  media: PropTypes.object,
  scheme: PropTypes.string,
  link: PropTypes.string,
  title: PropTypes.string,
  index: PropTypes.number,
  limit: PropTypes.number,
};

MasonryGrid.displayName = "GalleryList.MasonryGrid";

MasonryGrid.propTypes = {
  items: PropTypes.array,
  limit: PropTypes.number,
  isLoading: PropTypes.bool,
};
