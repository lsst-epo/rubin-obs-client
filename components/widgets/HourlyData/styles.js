import styled from "styled-components";
import WidgetBackground from "@/components/atomic/WidgetBackground";
import ScrollableHorizontalWrapper from "@/components/atomic/ScrollableHorizontalWrapper";

export const HourlyDataBackground = styled(WidgetBackground)`
  grid-column: 1/-1;
`;

export const HourlyDataTitle = styled.h3`
  font-size: 1em;
  font-weight: var(--FONT_WEIGHT_NORMAL, 400);
`;

export const HourlyDataList = styled(ScrollableHorizontalWrapper)`
  display: flex;
  gap: calc(var(--PADDING_SMALL, 20px) * 1.5);
  height: 100%;
`;

export const HourlyDataItem = styled.li`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Time = styled.time`
  white-space: nowrap;
`;
