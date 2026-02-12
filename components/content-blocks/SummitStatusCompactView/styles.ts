import styled from "styled-components";
import WidgetBackground from "@/components/atomic/WidgetBackground";

export const Container = styled.div`
  padding: 25px 0px 0px;
  background-color: var(--neutral95, #1f2121);
`;

export const CondensedBackground = styled(WidgetBackground)`
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: repeat(1, 1fr);
  grid-column: 1 / -1;
  gap: var(--widget-padding);
`;
