import styled, { css } from "styled-components";
import { tokens, respond, fluidScale } from "@/styles/globalStyles";

function mobile(styles) {
  return respond(styles, tokens.BREAK_PHABLET);
}

function tablet(styles) {
  return respond(styles, tokens.BREAK_DESKTOP_SMALL);
}

export const Inner = styled.div`
  display: grid;
  grid-template:
    "image . text" auto
    "image quote quote" 126px
    ". quote quote" auto
    / auto minmax(42px, 148px) 1fr;

  // Accent color is always across the first row
  &:before {
    content: "";
    background-color: #edfffe;
    grid-row: 1;
    grid-column: 1 / -1;
  }

  ${tablet(
    css`
      grid-template:
        "image text text" auto
        "image quote quote" 126px
        ". quote quote" auto
        / auto minmax(42px, 148px) 1fr;
      column-gap: 27px;
    `
  )}

  ${mobile(css`
    grid-template:
      "image" auto
      "image" 80px
      "quote" auto
      "text" auto
      / 1fr;
  `)}
`;

export const Text = styled.div`
  grid-area: text;
  padding: 60px;
  padding-inline-start: 0;

  ${mobile(`padding: 15px;`)}
`;

export const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding-block-start: 32px;
  text-align: center;

  ${mobile(
    css`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      padding-block-start: 15px;
    `
  )}
`;

export const Quote = styled.blockquote`
  grid-area: quote;
  font-weight: bold;
  padding-inline-end: 60px;
  padding-block-start: 15px;

  ${mobile(
    css`
      padding: 15px;
      padding-block-start: 0;
    `
  )}
`;

export const Attribution = styled.cite`
  font-style: normal;
`;

export const QuoteImageWrapper = styled.figure`
  grid-area: image;
  position: relative;
  align-self: end;
  margin-inline-start: ${fluidScale("69px", "0px")};

  ${tablet(`margin-inline-start: -30px`)}

  ${mobile(css`
    justify-self: end;
    margin-inline-end: calc(50% - 80px);
  `)}
`;

export const QuoteSvgMobile = styled.div`
  display: none;
  ${mobile(`display: block`)}
`;

export const QuoteSvgDesktop = styled.div`
  ${mobile(`display: none`)}
`;
