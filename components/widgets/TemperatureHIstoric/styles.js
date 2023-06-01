import styled from "styled-components";
import WidgetBackground from "@/components/atomic/WidgetBackground";

export const TemperatureHistoricBackground = styled(WidgetBackground)`
  font-size: 0.75rem;
  grid-column: 1/-1;
`;

export const TableWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: auto;
  scrollbar-color: var(--white, #fff) rgba(255, 255, 255, 20%);
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    height: 8px;
    background-color: rgba(255, 255, 255, 50%); /* or add it to the track */
    background-clip: padding-box;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--white, #fff);
    border-radius: 4px;
  }
`;

export const TemperatureTable = styled.table`
  width: 100%;
  height: 100%;
  text-align: center;
`;

export const TemperatureHeader = styled.th`
  font-weight: normal;
  padding: 0;
`;

export const TemperatureCell = styled.td`
  font-size: var(--cell-font-size, 1em);
  font-variant-numeric: tabular-nums;
  line-height: 1;
  white-space: nowrap;
  padding: 0;
`;
