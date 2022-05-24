/* eslint-disable */
import styled from "styled-components";
import BaseMixedLink from "@/atomic/MixedLink";
import { BREAK_PHABLET, fluidScale } from "@/styles/globalStyles";

export const Image = styled.div`
  --Tile-image-margin-top: ${fluidScale("77px", "22px")};

  grid-area: image;

  background-color: var(--Tile-image-bg-color);
  padding-block-end: ${fluidScale("40px", "5px")};
  margin-block-start: var(--Tile-image-margin-top);
  width: 100%;
  border-top: 3px solid;
  border-right: 3px solid;
  border-left: 3px solid;
  border-color: var(--Tile-border-color, var(--Tile-image-bg-color));
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  transition: backgroud-color 0.2s;

  img {
    width: ${fluidScale("200px", "150px")};
    height: ${fluidScale("200px", "150px")};
    margin: calc(var(--Tile-image-margin-top) * -1) auto 0 auto;
    filter: var(--Tile-image-filter, none);
  }

  @media (max-width: ${BREAK_PHABLET}) {
    height: 100px;
    border-radius: 16px;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    padding: 10px;

    img {
      margin: auto;
      width: 80px;
      height: 80px;
    }
  }
`;

export const Title = styled.div`
  grid-area: title;

  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background-color: var(--Tile-bg-color);
  padding: 20px 10px;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  transition: backgroud-color 0.2s;

  @media (max-width: ${BREAK_PHABLET}) {
    text-align: left;
    align-self: center;
    justify-self: left;
  }
`;

export const MixedLink = styled(BaseMixedLink)`
  --Tile-bg-color: var(--turquoise55);
  --Tile-color: var(--white);
  --Tile-image-bg-color: var(--neutral20);

  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: ${fluidScale("234px", "164px")} 1fr;
  grid-template-areas:
    "image"
    "title";
  align-content: start;
  justify-items: center;
  padding: 0;
  border-radius: 16px;
  color: var(--Tile-color);
  text-decoration: none;

  &[aria-disabled="true"] {
    --Tile-bg-color: #6a6e6e;
    --Tile-image-filter: grayscale(100%);

    cursor: default;
    pointer-events: none;

    @media (max-width: ${BREAK_PHABLET}) {
      --Tile-bg-color: transparent;
      --Tile-color: #6a6e6e;
    }
  }

  @media (max-width: ${BREAK_PHABLET}) {
    --Tile-bg-color: var(--white);
    --Tile-color: var(--turquoise55);

    grid-template: auto / 100px 2fr;
    grid-template-areas: "image title title";
  }

  &:hover:not([aria-disabled="true"]),
  &:focus-visible:not([aria-disabled="true"]) {
    --Tile-image-bg-color: var(--turquoise10);
    --Tile-bg-color: var(--turquoise70);
    --Tile-border-color: var(--turquoise55);
  }
`;
