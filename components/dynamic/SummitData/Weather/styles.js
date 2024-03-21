import styled from "styled-components";
import WidgetBackground from "@/components/atomic/WidgetBackground";

export const Preview = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const PreviewItem = styled.div`
  display: flex;
`;

export const CondensedBackground = styled(WidgetBackground)`
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: repeat(2, 1fr);
  grid-column: 1 / -1;
  gap: var(--widget-padding);
`;
