import styled from "styled-components";
import { MixedLink } from "@rubin-epo/epo-react-lib";
import SharePopupComponent from "@/layout/SharePopup";
import {
  fluidScale,
  containerRegular,
  respond,
  tokens,
} from "@/styles/globalStyles";
import { Section as CalloutSection } from "../styles";

export const Section = styled(CalloutSection)`
  position: relative;
`;

export const Inner = styled(MixedLink)`
  ${containerRegular()}
  position: ${(p) => p.$position};
  display: grid;
  gap: 40px;
  grid-template-columns: 1fr;
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

  // set the grid areas for various bits
  .image {
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
  }
  .title {
    grid-area: title;
  }
  .subtitle {
    grid-area: subtitle;
    margin-top: 0.727em;
    font-size: 18px;
    font-weight: 700;

    ${respond(
      `
      font-size: 16px
    `,
      tokens.BREAK_MOBILE
    )}
  }
  .text {
    grid-area: text;
  }
  .footer {
    display: grid;
    grid-area: footer;
    grid-template-columns: max-content 1fr;
    place-items: end;
    margin-top: 15px;

    .c-buttonish {
      &:hover {
        outline: none;
      }
    }
  }

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

    .image, .title, .subtitle, .text {
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
    }

    .image {
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
      )};
    }

    .title {
      margin-top: ${fluidScale(
        "43px",
        "20px",
        tokens.BREAK_TABLET,
        tokens.BREAK_MOBILE
      )};
    }

    .subtitle {
      margin-top: 2px;
    }

    .text {
      margin-top: 20px;
    }

    .footer {
      grid-template-columns: 1fr;

      .c-buttonish {
        display: block;
        width: 100%;
      }
    }
  `
  )}

  &:hover,
  &:focus-visible {
    outline: 3px solid var(--turquoise85);
    outline-offset: var(--Tile-hover-outline-offset, 1px);
    .image {
      filter: invert(25%) sepia(80%) saturate(102%) hue-rotate(130deg)
        brightness(100%) contrast(100%);
      outline: none;
      opacity: 0.7;
    }
    .title,
    .subtitle,
    .text {
      color: var(--turquoise60);
    }
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
`;

export const ImageSticker = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 16px 24px;
  color: ${tokens.white};
  background-color: ${tokens.turquoise85};
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

export const SharePopup = styled(SharePopupComponent)`
  position: absolute;
  inset-inline-end: 30px;
  inset-block-end: 30px;
  color: var(--neutral40);

  @media (max-width: ${tokens.BREAK_TABLET}) {
    display: none;
  }
`;
