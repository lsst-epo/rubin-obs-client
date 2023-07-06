import styled from "styled-components";
import WidgetBackground from "@/components/atomic/WidgetBackground";

export const TemperatureHistoricBackground = styled(WidgetBackground)`
  grid-column: 1/-1;
`;

export const TemperatureTable = styled.table`
  width: 100%;
  height: 100%;
  text-align: center;
`;

export const TemperatureHeader = styled.th`
  padding: 0;
  font-weight: normal;
`;

export const TemperatureCell = styled.td`
  padding: 0;
  font-size: var(--cell-font-size, 1em);
  font-variant-numeric: tabular-nums;
  line-height: 1;
  white-space: nowrap;
`;
