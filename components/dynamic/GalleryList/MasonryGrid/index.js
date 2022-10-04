import PropTypes from "prop-types";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useGlobalData } from "@/lib/utils";
import { shapeGalleryAssetData } from "@/lib/api/gallery";
import * as Styled from "./styles";

function template(i, width) {
  return `
    > :nth-child(${i + 1}n + ${i + 1}) {
      width: ${width}%;
    }
  `;
}

function getBrickSizes(limit) {
  const widthMap = [20, 20, 20, 20, 30, 30, 30, 40, 40, 80];
  let str = "";
  for (let i = 0; i < limit; i++) {
    // random:
    //   let width = widthMap[Math.floor(Math.random() * widthMap.length)];
    const width = widthMap[i];
    str += template(i, width);
  }
  return str;
}

const Tile = ({
  image: { url, width, height, altText },
  isVideo,
  link,
  title,
}) => {
  return (
    <Link href={link} passHref>
      <Styled.TileLink aria-label={title}>
        <Styled.Image
          src={url}
          width={width}
          height={height}
          alt={altText}
          loading="lazy"
        />
        {isVideo && <Styled.Icon icon="play" />}
      </Styled.TileLink>
    </Link>
  );
};

export default function MasonryGrid({ items, limit = 10, isLoading = false }) {
  const brickSizes = getBrickSizes(limit);
  const {
    localeInfo: { language },
  } = useGlobalData();
  const { t } = useTranslation();
  const skeleton = [...Array(limit).keys()].map((_, i) => (
    <Styled.SkeletonTile key={i} aria-hidden />
  ));

  return (
    <Styled.Grid
      role="region"
      aria-label={t("gallery.results")}
      aria-busy={isLoading}
      $brickSizes={brickSizes}
    >
      {isLoading && (
        <>
          {skeleton}
          <span className="a-hidden">{t("gallery.loading")}</span>
        </>
      )}
      {!isLoading &&
        items.map((item) => {
          const { id, uri, scheme, title, image } = shapeGalleryAssetData({
            assetData: item,
            language,
          });
          return (
            <Tile
              key={id}
              image={image}
              link={uri}
              title={title}
              isVideo={scheme === "video"}
            />
          );
        })}
    </Styled.Grid>
  );
}

Tile.displayName = "GalleryList.MasonryGrid.Tile";

Tile.propTypes = {
  image: PropTypes.object,
  isVideo: PropTypes.bool,
  link: PropTypes.string,
  title: PropTypes.string,
};

MasonryGrid.displayName = "GalleryList.MasonryGrid";

MasonryGrid.propTypes = {
  items: PropTypes.array,
  limit: PropTypes.number,
  isLoading: PropTypes.bool,
};
