import styled from "styled-components";
import { MixedLink } from "@rubin-epo/epo-react-lib";
import SharePopupComponent from "@/layout/SharePopup";
import {
  fluidScale,
  containerRegular,
  respond,
  tokens,
} from "@/styles/globalStyles";
import { Text, Section as CalloutSection } from "../styles";

const mobileMargins = () =>
  `
  margin-left: ${fluidScale(
    "55px",
    "0px",
    tokens.BREAK_TABLET,
    tokens.BREAK_MOBILE
  )};
  margin-right: ${fluidScale(
    "55px",
    "0px",
    tokens.BREAK_TABLET,
    tokens.BREAK_MOBILE
  )};
`;

export const StyledSection = styled(CalloutSection)`
  position: relative;
`;

export const StyledInner = styled(MixedLink)`
  ${containerRegular()}
  position: ${(p) => p.$position};
  display: grid;
  gap: 40px;
  grid-template-areas:
    "image title"
    "image subtitle"
    "image text"
    "image footer";
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  grid-column-gap: 30px;
  min-height: 360px;
  height: 100%;
  padding-top: ${fluidScale("50px", "30px")};
  padding-bottom: ${fluidScale("50px", "40px")};
  align-content: start;
  text-decoration: none;
  transition: color 0.2s, background-color 0.2s;

  ${respond(
    `
    grid-template-areas:
      "image image"
      "title title"
      "subtitle subtitle"
      "text text"
      "footer footer";
    gap: 0;
    justify-content: center;
    text-align: center;
  `
  )}

  &:hover,
  &:focus-visible {
    outline: 3px solid var(--turquoise85);
    outline-offset: var(--Tile-hover-outline-offset, 1px);
  }
`;

const innerHoverChildStyles = () =>
  `
  ${StyledInner}:hover &,
  ${StyledInner}:focus-visible & {
    color: var(--turquoise60);
  }
`;

export const StyledHeading = styled.h2`
  grid-area: title;

  ${innerHoverChildStyles()}

  ${respond(
    ` ${mobileMargins()}
      margin-top: ${fluidScale(
        "43px",
        "20px",
        tokens.BREAK_TABLET,
        tokens.BREAK_MOBILE
      )};
    `
  )}
`;

export const StyledSubheading = styled.div`
  grid-area: subtitle;
  margin-top: 0.727em;
  font-size: 18px;
  font-weight: 700;

  ${innerHoverChildStyles()}

  ${respond(
    ` ${mobileMargins()}
      margin-top: 2px;
    `
  )}

  ${respond(
    `
    font-size: 16px
  `,
    tokens.BREAK_MOBILE
  )}
`;

export const StyledText = styled(Text)`
  grid-area: text;

  ${innerHoverChildStyles()}

  ${respond(
    ` ${mobileMargins()}
      margin-top: 20px;
    `
  )}
`;

export const StyledImageWrapper = styled.div`
  position: relative;
  grid-area: image;
  overflow: hidden;
  min-height: 300px;
  opacity: 1;
  transition: filter 0.2s, opacity 0.2s;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${StyledInner}:hover &,
  ${StyledInner}:focus-visible & {
    filter: invert(25%) sepia(80%) saturate(102%) hue-rotate(130deg)
      brightness(100%) contrast(100%);
    outline: none;
    opacity: 0.7;
  }

  ${respond(
    ` ${mobileMargins()}
      min-height: ${fluidScale(
        "368px",
        "190px",
        tokens.BREAK_TABLET,
        tokens.BREAK_MOBILE
      )};
      margin-top: ${fluidScale(
        "15px",
        "0px",
        tokens.BREAK_TABLET,
        tokens.BREAK_MOBILE
      )};`
  )}
`;

export const StyledImageSticker = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 16px 24px;
  color: var(--white);
  background-color: var(--turquoise85);
  font-size: 18px;
  font-weight: 700;

  ${respond(
    `
    right: 0;
    padding: 0 16px;
  `,
    tokens.BREAK_PHABLET
  )}
`;

export const StyledFooter = styled.div`
  display: grid;
  grid-area: footer;
  grid-template-columns: max-content 1fr;
  place-items: end;
  margin-top: 15px;

  ${respond(`grid-template-columns: 1fr;`)}
`;

export const StyledFooterButton = styled.div`
  &.c-buttonish:not(:disabled, [aria-disabled="true"]):hover,
  &.c-buttonish:not(:disabled, [aria-disabled="true"]).focus-visible {
    outline: none;
  }

  ${respond(
    `
    display: block;
    width: 100%;
  `
  )}
`;

export const StyledSharePopup = styled(SharePopupComponent)`
  position: absolute;
  inset-inline-end: 30px;
  inset-block-end: 30px;
  color: var(--neutral40);

  @media (max-width: ${tokens.BREAK_TABLET}) {
    display: none;
  }
`;
