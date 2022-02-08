import Image from "@/primitives/Image";
import MixedLink from "@/primitives/MixedLink";
import styled from "styled-components";
import {
  fluidScale,
  containerFullBleed,
  containerRegular,
  needsDarkColor,
  pxToEm,
  respond,
  tokens,
} from "@/styles/globalStyles";

const breakpointMin = tokens.BREAK_TABLET_MIN;
const gap = "40px";
const linkPadding = pxToEm("18px", "16px");

export const Section = styled.section`
  background-color: ${(p) => tokens[p.bgColor]};
  color: ${(p) =>
    needsDarkColor(tokens[p.bgColor]) ? tokens.neutral80 : tokens.white};
  ${(p) => p.width === "block" && containerFullBleed("CONTAINER_REGULAR")};
  ${(p) =>
    p.overlay &&
    `position: relative; top: -100px; background-color: transparent;
    ${respond(`top: -60px;`)}`};
`;

export const Inner = styled.div`
  ${containerRegular()}
  display: grid;
  grid-template-areas: ${(p) =>
    p.order === "text" ? `"text image"` : `"image text"`};
  ${(p) => `grid-template-columns: ${p.ratio}% 1fr;`}
  gap: ${gap};
  min-height: 360px;
  padding-top: ${fluidScale("50px", "30px")};
  padding-bottom: ${fluidScale("50px", "40px")};

  ${respond(
    `
    grid-template:
      "image" auto
      "text" auto / 100%;
    gap: ${gap};
    justify-content: center;
    text-align: center;
`
  )}

  ${(p) =>
    p.height === "slim"
      ? `min-height: 0; padding-top: 1em; padding-bottom: 1em;`
      : ""}
  ${(p) =>
    p.stack === "top"
      ? `min-height: 0; padding-top: 1em; padding-bottom: 0;
      ${respond(
        `grid-template-areas: "text" "image"; img { max-height: unset; width: 80%; }`
      )}`
      : ""}
  ${(p) =>
    p.stack === "bottom"
      ? `min-height: 0; padding-top: 0; padding-bottom: 1em; padding-right: 0;`
      : ""}
`;

export const Header = styled.header`
  flex-basis: percentage(1 / 3);
  grid-area: text;
  align-self: center;
  ${(p) => p.align === "end" && `align-self: end;`};
`;

export const Text = styled.div`
  margin-top: 0.727em;
`;

export const StyledMixedLink = styled(MixedLink)`
  margin-top: ${linkPadding};
  margin-right: ${linkPadding};

  &:nth-of-type(even) {
    background-color: ${tokens.red};
  }
`;

export const StyledImage = styled(Image)`
  grid-area: image;
  align-self: center;
  justify-self: center;
  width: 100%;

  ${respond(
    `      width: auto;
      max-height: 200px;
`
  )}

  ${(p) => p.padImage && respond(`padding: 2em;`, breakpointMin, "min")}
`;
export const StyledBackgroundImage = styled(Image)`
  grid-area: image;
  align-self: end;
  justify-self: center;
  width: 100%;

  ${respond(
    `      width: auto;
      max-height: 200px;
`
  )}
`;
export const StyledTwoToneImage = styled.div`
  grid-area: image;
  align-self: start;
  justify-self: end;
  width: ${fluidScale("180px", "130px")};
  min-height: 220px;
  margin-right: ${fluidScale("20px", "0px")};

  img {
    padding: 4px;
    border-radius: 100%;
    object-fit: cover;
  }

  ${respond(
    `max-width: 200px;
    width: 35vw;
    justify-self: center;
  `
  )}
`;

export const Caption = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: var(--neutral60);
`;
