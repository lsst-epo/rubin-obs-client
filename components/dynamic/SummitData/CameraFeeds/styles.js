import styled from "styled-components";
import WidgetBackground from "@/components/atomic/WidgetBackground";

export const CondensedBackground = styled(WidgetBackground)`
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: repeat(1, 1fr);
  grid-column: 1 / -1;
  gap: var(--widget-padding);
`;
