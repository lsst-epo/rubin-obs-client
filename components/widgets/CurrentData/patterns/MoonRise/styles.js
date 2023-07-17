import styled from "styled-components";
import WidgetBackground from "@/components/atomic/WidgetBackground";
import { Value } from "../../styles";
export * from "../../styles";

export const Background = styled(WidgetBackground)`
  flex-direction: row;
  grid-column: span 2;
`;

export const Timecard = styled.div`
  display: flex;
  flex: 0 1 50%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

export const Divider = styled.div`
  width: 1px;
  height: 4em;
  background-color: var(--white, #fff);
`;

export const Time = styled(Value)`
  --font-size: 400%;
`;
