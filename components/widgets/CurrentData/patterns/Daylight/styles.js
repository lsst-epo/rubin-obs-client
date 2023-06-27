import styled from "styled-components";
import { ChartFigure } from "@/components/charts";

export const Figure = styled(ChartFigure)`
  --widget-background-color: ${({ $variant }) =>
    `--widget-background-color: ${
      $variant === "primary" ? "#313333" : "transparent"
    }; --widget-columns: ${$variant === "primary" ? "span 3" : "1 / -1"}`};

  grid-column: var(--widget-columns, span 3);
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
