import styled from "styled-components";
import { ChartFigure } from "@/components/charts";

export const Figure = styled(ChartFigure)`
  --widget-background-color: ${({ $variant }) =>
    $variant === "primary" ? "#313333" : "transparent"};
  grid-column: span 3;
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
