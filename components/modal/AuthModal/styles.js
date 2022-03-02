import styled, { css } from "styled-components";
import { BREAK_PHABLET, fluidScale, respond } from "@/styles/globalStyles";

export const Inner = styled.div`
  display: flex;
`;

export const Content = styled.div`
  flex: 1 1 auto;
  padding: ${fluidScale("60px", "15px")};
  padding-block-start: 60px;
  width: calc(100vw - 30px);
  max-width: 550px;
`;

export const ImageWrapper = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: start;
  width: ${fluidScale("277px", "200px")};
  transition: background 1s ease-in, padding 1s ease-in;

  ${({ $image }) =>
    $image === "teacher"
      ? css`
          background: var(--orange10);
          justify-content: center;
          padding-block-start: 134px;
          padding-inline-start: 20px;
          padding-inline-end: 20px;
        `
      : css`
          background: var(--turquoise10);
          padding-block-start: 90px;
          padding-inline-start: 6px;
          padding-inline-end: 20px;
        `};

  ${respond(`display: none;`, BREAK_PHABLET)}
`;
