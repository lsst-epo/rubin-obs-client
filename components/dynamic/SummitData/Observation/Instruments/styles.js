import styled from "styled-components";
import WidgetBackground from "@/components/atomic/WidgetBackground";
import Azimuth from "@/components/widgets/CurrentData/patterns/Azimuth";
import Zenith from "@/components/widgets/CurrentData/patterns/Zenith";
import { BREAK_PHABLET_MIN } from "@/styles/globalStyles";

export const InstrumentsLayout = styled(WidgetBackground)`
  --instrument-columns: 1fr 1fr;
  --instrument-layout: "azimuth zenith" 2fr "slew shutter" 1fr /
    var(--instrument-columns);

  display: grid;
  grid-template: var(--instrument-layout);
  grid-column: 1/-1;

  @media screen and (min-width: ${BREAK_PHABLET_MIN}) {
    --instrument-columns: 2fr 2fr 1fr;
    --instrument-layout: "azimuth zenith slew" 1fr "azimuth zenith shutter" 1fr /
      var(--instrument-columns);
  }
`;

export const BigAzimuth = styled(Azimuth)`
  grid-area: azimuth;
  aspect-ratio: 1;
`;

export const BigZenith = styled(Zenith)`
  grid-area: zenith;
  aspect-ratio: 1;
`;
