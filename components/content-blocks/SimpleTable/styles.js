import { respond, tokens } from "@/styles/globalStyles";
import styled, { css } from "styled-components";

// TODO: Add these to the color tokens after auth branch is merged in
const colors = {
  blue: "#C7D4F4",
  green: "#D7E6CF",
  orange: "#FFEDD9",
  paleOrange: "#FFF8F0",
};

// a11y link colors
const linkColors = {
  blue: tokens.turquoise90,
  green: tokens.turquoise90,
  orange: tokens.turquoise80,
  paleOrange: tokens.turquoise80,
};

export const List = styled.dl`
  display: grid;
  grid-template-columns: 212px 1fr;
  gap: 5px;

  ${respond(`grid-template-columns: 1fr;`, tokens.BREAK_PHABLET)}

  a:not([class^="c-"]) {
    color: var(--SimpleTable-link-color, ${linkColors.orange});
    text-decoration: underline;
  }
`;

export const Title = styled.dt`
  padding: 20px;
  padding-inline-end: 6px;
  padding-block-end: 22px;

  ${({ $color }) =>
    css`
      background: ${colors[$color]};
      --SimpleTable-link-color: ${linkColors[$color]};
    `}
`;

export const Description = styled.dd`
  padding: 20px;
  padding-block-end: 22px;

  ${({ $color }) =>
    css`
      background: ${colors[$color]};
      --SimpleTable-link-color: ${linkColors[$color]};
    `}
`;
