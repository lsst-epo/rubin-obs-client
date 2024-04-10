import styled from "styled-components";
import { MixedLink } from "@rubin-epo/epo-react-lib";
import SharePopupComponent from "@/layout/SharePopup";
import {
  fluidScale,
  containerRegular,
  respond,
  tokens,
} from "@/styles/globalStyles";
import { Text as CalloutText, Section as CalloutSection } from "../styles";

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

export const Section = styled(CalloutSection)`
  position: relative;
`;

export const Inner = styled.div`
  ${containerRegular()}
  display: grid;
  grid-template-areas:
    "image title"
    "image subtitle"
    "image text"
    "image footer";
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  grid-column-gap: 30px;
  gap: 40px;
  align-content: start;
  height: 100%;
  min-height: 360px;
  padding-top: ${fluidScale("50px", "30px")};
  padding-bottom: ${fluidScale("50px", "40px")};
  text-decoration: none;
  transition: color 0.2s, background-color 0.2s;

  ${({ $isImage }) =>
    !$isImage &&
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
  `}

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
`;

export const Heading = styled.h2`
  grid-area: title;

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

export const Subheading = styled.div`
  grid-area: subtitle;
  margin-top: 0.727em;
  font-size: 18px;
  font-weight: 700;

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

export const Text = styled(CalloutText)`
  grid-area: text;

  ${respond(
    ` ${mobileMargins()}
      margin-top: 20px;
    `
  )}
`;

export const ImageWrapper = styled.div`
  position: relative;
  grid-area: image;
  min-height: 300px;
  overflow: hidden;
  opacity: 1;
  transition: filter 0.2s, opacity 0.2s;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
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

export const ImageSticker = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 16px 24px;
  font-size: 18px;
  font-weight: 700;
  color: var(--white);
  background-color: var(--turquoise85);

  ${respond(
    `
    right: 0;
    padding: 0 16px;
  `,
    tokens.BREAK_PHABLET
  )}
`;

export const Footer = styled.div`
  display: grid;
  grid-area: footer;
  grid-template-columns: max-content 1fr;
  place-items: end;
  margin: 15px 0 0;

  ${({ $isImage }) =>
    !$isImage &&
    `
    margin: 15px auto 0;
    grid-template-columns: 1fr;
  `}

  ${respond(`grid-template-columns: 1fr;`)}
`;

export const FooterButton = styled(MixedLink)`
  ${respond(
    `
    display: block;
    width: 100%;
  `
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
