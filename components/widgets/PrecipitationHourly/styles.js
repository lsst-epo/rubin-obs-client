import styled from "styled-components";
import WidgetBackground from "@/components/atomic/WidgetBackground";

export const PrecipitationHourlyBackground = styled(WidgetBackground)`
  grid-column: 1/-1;
`;

export const PrecipitationHourlyTitle = styled.h3`
  font-size: 1em;
  font-weight: var(--FONT_WEIGHT_NORMAL, 400);
`;
