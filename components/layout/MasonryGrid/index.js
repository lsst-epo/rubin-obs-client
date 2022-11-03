import PropTypes from "prop-types";
import Link from "next/link";
import styled from "styled-components";
import ResponsiveImage from "@/components/atomic/ResponsiveImage";
import { containerRegular } from "@/styles/globalStyles";
import IconComposer from "@/components/svg/IconComposer";

const Tile = ({ image, isVideo, link, title }) => {
  return (
    <Link legacyBehavior href={link} passHref>
      <StyledTileLink>
        <ResponsiveImage image={image} ratio="16:9" title={title} />
        {isVideo && (
          <PlayButton>
            <IconComposer icon="play" />
          </PlayButton>
        )}
      </StyledTileLink>
    </Link>
  );
};

export default function MasonryGrid({ items }) {
  const brickSizes = getBrickSizes();

  function template(i, width) {
    return `
          a:nth-child(${i + 1}n + ${i + 1}) {
            width: ${width}%;
          }
        `;
  }

  function getBrickSizes() {
    const widthMap = [20, 20, 20, 20, 30, 30, 30, 40, 40, 80];
    let str = "";
    for (let i = 0; i < 20; i++) {
      // random:
      //   let width = widthMap[Math.floor(Math.random() * widthMap.length)];
      const width = widthMap[i];
      str += template(i, width);
    }
    return str;
  }

  function checkIfVideo(cats) {
    return cats?.[0]?.slug === "video";
  }

  return (
    <BrickRow brickSizes={brickSizes}>
      {items.map(({ galleryItemCategory, id, image, title, uri }, i) => (
        <Tile
          key={id}
          image={image?.[0]}
          link={`/${uri}`}
          title={title}
          isVideo={checkIfVideo(galleryItemCategory)}
        />
      ))}
    </BrickRow>
  );
}

const StyledTileLink = styled.a`
  position: relative;
  transition: filter 0.2s;
  &:hover,
  &:focus-visible {
    img {
      filter: invert(25%) sepia(80%) saturate(102%) hue-rotate(130deg)
        brightness(100%) contrast(100%);
      outline: none;
      opacity: 0.7;
    }
  }
`;

const PlayButton = styled.span`
  position: absolute;
  display: block;
  width: 6%;
  height: auto;
  min-width: 40px;
  min-height: 40px;
  color: var(--white);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &:hover {
    color: var(--neutral15);
  }
  svg {
    width: 100%;
    height: 100%;
    min-width: 40px;
    min-height: 40px;
  }
`;

const BrickRow = styled.div`
  ${containerRegular()}
  display: flex;
  flex-wrap: wrap;
  a {
    max-height: 400px;
    overflow: hidden;
    margin: 0 0.5rem 1rem 0.5rem;
    flex: 1 0 auto;
    div {
      height: 100%;
    }
  }
  ${(p) => p.brickSizes}

  @media (max-width: 640px) {
    display: block;
    && a {
      display: block;
      width: 100%;
    }
  }
`;

Tile.displayName = "Layout.MasonryGridTile";

Tile.propTypes = {
  image: PropTypes.object,
  isVideo: PropTypes.bool,
  link: PropTypes.string,
  title: PropTypes.string,
};

MasonryGrid.displayName = "Layout.MasonryGrid";

MasonryGrid.propTypes = {
  items: PropTypes.array,
};
