import { token } from "@/styles/globalStyles";
import styled from "styled-components";

export const WidgetGrid = styled.div`
  --widget-row-gap: var(--PADDING_SMALL, 20px);
  --widget-columns: ${(props) => (props.gridcount > 1 ? 2 : 1)};

  display: inline-grid;
  grid-template-columns: repeat(var(--widget-columns), 1fr);
  grid-auto-rows: 1fr;
  grid-auto-flow: row dense;
  grid-gap: var(--widget-row-gap);
  place-content: center;
  justify-content: center;

  &:not(:first-child) {
    margin-block-start: var(--widget-row-gap);
  }

  @media screen and (min-width: ${token("BREAK_DESKTOP_SMALL")}) {
    --widget-columns: ${(props) => props.gridcount};

    grid-template-columns: none;
    grid-auto-columns: calc(100vw / 7);
    grid-auto-flow: column;
  }
`;
