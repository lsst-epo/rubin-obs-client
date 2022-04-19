import styled, { css } from "styled-components";
import { fluidScale, respond, tokens } from "@/styles/globalStyles";
import { aHidden } from "@/styles/mixins/appearance";

const WRAPPER_PADDING = fluidScale(
  "60px",
  "15px",
  tokens.BREAK_DESKTOP_SMALL,
  tokens.BREAK_MOBILE
);

export const Wrapper = styled.div`
  position: relative;
  padding-inline-start: ${WRAPPER_PADDING};
  padding-inline-end: ${WRAPPER_PADDING};
  background-color: ${tokens.orange05};
`;

export const Inner = styled.div`
  
  display: grid;
  grid-template:
    "image text duration"
    "image button duration"
    / 200px 1fr 197px;
  column-gap: 60px;
  align-items: stretch;
  max-width: 1158px;
  margin 0 auto;
  
  ${respond(
    `
      grid-template:
        "text"
        "image"
        "button"
        / 1fr;
      row-gap: ${fluidScale("30px", "15px")};
      justify-items: center;
      padding-block-start: 50px;
      padding-block-end: 30px;
    `,
    tokens.BREAK_TABLET
  )}
`;

export const Image = styled.div`
  grid-area: image;
  width: ${fluidScale("200px", "160px")};
  height: ${fluidScale("200px", "160px")};
  align-self: center;
`;

export const Text = styled.div`
  grid-area: text;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const ButtonWrapper = styled.div`
  grid-area: button;

  ${respond(
    css`
      width: 100%;
      display: flex;
      flex-direction: column;
    `,
    tokens.BREAK_TABLET
  )}
`;

export const Duration = styled.div`
  grid-area: duration;
  background-color: #ffe7cc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-inline-start: 5px;
  padding-inline-end: 5px;
  min-height: 265px;
  text-align: center;

  ${respond(
    css`
      position: absolute;
      top: 0;
      right: 0;
      flex-direction: row;
      min-height: 0;
      padding: 10px;

      svg {
        margin-inline-end: 9px;
        height: 17px;
        width: 15px;
      }
    `,
    tokens.BREAK_TABLET
  )}
`;

export const DurationTime = styled.div`
  font-size: ${fluidScale("40px", "24px")};
  font-weight: bold;

  ${respond(
    css`
      font-size: 16px;
    `,
    tokens.BREAK_TABLET
  )}
`;

export const DurationText = styled.div`
  padding-block-start: 10px;

  ${respond(
    css`
      ${aHidden}
    `,
    tokens.BREAK_TABLET
  )}
`;
