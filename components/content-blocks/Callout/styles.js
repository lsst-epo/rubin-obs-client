"use client";
import { Image, MixedLink } from "@rubin-epo/epo-react-lib";
import styled from "styled-components";
import {
  fluidScale,
  containerFullBleed,
  containerRegular,
  respond,
  tokens,
} from "@/styles/globalStyles";

const breakpointMin = tokens.BREAK_TABLET_MIN;
const gap = "var(--size-spacing-l)";

export const Section = styled.section`
  background-color: var(--color-background-section);
  ${(p) => p.$width === "block" && containerFullBleed("CONTAINER_REGULAR")};
  ${(p) =>
    p.$overlay &&
    `position: relative; top: -100px; background-color: transparent;
    ${respond(`top: -60px;`)}`};

  &[data-dark-mode="true"] {
    color: var(--color-font-invert);
  }
`;

export const Inner = styled.div`
  ${containerRegular()}
  display: grid;
  /* stylelint-disable named-grid-areas-no-invalid */
  grid-template-areas: ${(p) =>
    p.$order === "text" ? `"text image"` : `"image text"`};
  ${(p) => `grid-template-columns: ${p.$ratio}% 1fr;`}
  /* stylelint-enable named-grid-areas-no-invalid */
  gap: ${gap};
  min-height: 360px;
  padding-top: ${fluidScale("50px", "30px")};
  padding-bottom: ${fluidScale("50px", "40px")};

  ${(p) =>
    !p.$isImage &&
    `
    grid-template:
      "text" auto / 100%;
    gap: ${gap};
    justify-content: center;
    text-align: center;
  `}

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
    p.$height === "slim"
      ? `min-height: 0; padding-top: 1em; padding-bottom: 1em;`
      : ""}
  ${(p) =>
    p.$stack === "top"
      ? `min-height: 0; padding-top: 1em; padding-bottom: 0;
      ${respond(
        `grid-template-areas: "text" "image"; img { max-height: unset; width: 80%; }`
      )}`
      : ""}
  ${(p) =>
    p.$stack === "bottom"
      ? `min-height: 0; padding-top: 0; padding-bottom: 1em; padding-right: 0;`
      : ""}
`;

export const Header = styled.header`
  grid-area: text;
  align-self: center;
  ${(p) => p.$align === "end" && `align-self: end;`};

  > * + * {
    margin-block-start: var(--size-spacing-xs);
  }
`;

export const Text = styled.div`
  a {
    overflow-wrap: anywhere;
  }
`;

export const StyledMixedLink = styled(MixedLink)`
  &:nth-of-type(even) {
    --button-background-color: var(--color-rubin-purple-300, #583671);
    --button-border-color: var(--color-rubin-purple-300, #583671);
    --button-color: var(--white);
  }
`;

export const StyledImage = styled(Image)`
  grid-area: image;
  place-self: center center;
  width: 100%;

  ${respond(
    `      width: auto;
      max-height: 200px;
`
  )}

  ${(p) => p.$padImage && respond(`padding: 2em;`, breakpointMin, "min")}
`;
export const StyledBackgroundImage = styled(Image)`
  grid-area: image;
  place-self: end center;
  width: 100%;

  ${respond(
    `width: auto;
      max-height: 200px;
`
  )}
`;
export const StyledTwoToneImage = styled.div`
  grid-area: image;
  place-self: start end;
  width: ${fluidScale("180px", "130px")};
  min-height: 220px;
  margin-right: ${fluidScale("20px", "0px")};

  img {
    padding: 4px;
    object-fit: cover;
    border-radius: 100%;
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
  font-weight: 700;
  color: var(--neutral60);
`;
