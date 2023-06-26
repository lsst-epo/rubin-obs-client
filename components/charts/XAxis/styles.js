import styled from "styled-components";

export const BaseLine = styled.line`
  stroke: var(--white, #fff);
`;

export const Tick = styled.line`
  stroke: var(--white, #fff);
  stroke-width: 2;
`;

export const TickLabel = styled.text`
  font-size: 14px;
  alignment-baseline: hanging;
  dominant-baseline: hanging;
  text-anchor: middle;
`;
