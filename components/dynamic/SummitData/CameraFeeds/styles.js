import styled from "styled-components";
import WidgetBackground from "@/components/atomic/WidgetBackground";
import Image from "next/image";

export const CondensedBackground = styled(WidgetBackground)`
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: repeat(1, 1fr);
  grid-column: 1 / -1;
  gap: var(--widget-padding);
`;

export const Container = styled.div`
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: repeat(2, 1fr);
  grid-column: 1 / -1;
  gap: var(--widget-padding);
`;

export const InfoIcon = styled(Image)`
  grid-column: 2;
  place-self: center center;
`;
