import styled from "styled-components";

export const Tooltip = styled.g`
  cursor: default;
`;

export const TooltipBackground = styled.rect`
  fill: #dce0e3;
`;

export const TooltipText = styled.text`
  color: var(--black, #000);
  dominant-baseline: central;
  font-size: 12px;
  text-anchor: middle;
`;

export const TooltipArrow = styled.polygon`
  fill: #dce0e3;
`;
