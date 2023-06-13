import styled from "styled-components";
import WidgetBackground from "@/components/atomic/WidgetBackground";
import ScrollableHorizontalWrapper from "@/components/atomic/ScrollableHorizontalWrapper";

export const WindspeedHourlyBackground = styled(WidgetBackground)`
  grid-column: 1/-1;
`;

export const WindspeedHourlyTitle = styled.h3`
  font-size: 1em;
  font-weight: var(--FONT_WEIGHT_NORMAL, 400);
`;

export const WindspeedHourlyList = styled(ScrollableHorizontalWrapper)`
  display: flex;
  gap: var(--PADDING_SMALL, 20px);
  height: 100%;
`;

export const WindspeedHourlyItem = styled.li`
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  text-align: center;
`;

export const Speed = styled.span`
  white-space: nowrap;
`;

export const Time = styled.time``;

export const Direction = styled.div`
  background-color: var(--black, #000);
  border-radius: 50%;
  color: #30e0e3;
  width: 46px;
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(var(--angle, 0deg));
`;

export const NoData = styled.span`
  color: var(--white, #fff);
  font-size: 0.5em;
`;
