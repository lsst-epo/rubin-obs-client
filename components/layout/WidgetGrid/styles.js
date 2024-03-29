import { token } from "@/styles/globalStyles";
import styled from "styled-components";

export const WidgetGrid = styled.div`
  --widget-row-gap: var(--PADDING_SMALL, 20px);
  --widget-columns: 1;

  display: grid;
  grid-template-columns: repeat(var(--widget-columns), 1fr);
  grid-auto-rows: 1fr;
  grid-auto-flow: row dense;
  grid-gap: var(--widget-row-gap);

  &:not(:first-child) {
    margin-block-start: var(--widget-row-gap);
  }

  @media screen and (min-width: ${token("BREAK_TABLET_MIN")}) {
    --widget-columns: 3;
  }

  @media screen and (min-width: ${token("BREAK_DESKTOP_SMALL")}) {
    --widget-columns: 6;
  }
`;
