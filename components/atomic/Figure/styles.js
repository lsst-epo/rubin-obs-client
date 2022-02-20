import styled, { css } from "styled-components";

export const Figure = styled.figcaption`
  ${({ $withBackground }) =>
    $withBackground &&
    css`
      background-color: var(--neutral10);
      padding: 20px;
    `}
`;

export const FigCaption = styled.figcaption`
  font-size: 18px;
  padding-block-start: 1em;
`;
