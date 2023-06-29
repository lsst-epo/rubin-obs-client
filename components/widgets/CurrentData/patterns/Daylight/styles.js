import styled from "styled-components";
import { token } from "@/styles/globalStyles";
import { ChartFigure } from "@/components/charts";

export const Figure = styled(ChartFigure)`
  --widget-columns: 1 / -1;
  ${({ $variant }) =>
    `--widget-background-color: ${
      $variant === "primary" ? "#313333" : "transparent"
    }`};

  grid-column: var(--widget-columns, span 3);

  @media screen and (min-width: ${token("BREAK_TABLET_MIN")}) {
    --widget-columns: ${({ $variant }) =>
      $variant === "primary" ? "span 3" : "1 / -1"};
  }
`;

export const BoundRect = styled.rect`
  fill: var(--fill, var(--neutral95, #1f2121));
  stroke: var(--neutral20, #dce0e3);
  stroke-width: 1;
`;

export const Now = styled.line`
  stroke: var(--white, #fff);
  stroke-width: 5;
`;

export const NowTip = styled.polygon`
  fill: var(--neutral20, #dce0e3);
`;
