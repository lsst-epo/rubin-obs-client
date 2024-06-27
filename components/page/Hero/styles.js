import styled from "styled-components";
import { fluidScale, containerFullBleed } from "@/styles/globalStyles";
import { Image } from "@rubin-epo/epo-react-lib";

export const HeroContainer = styled.div`
  ${containerFullBleed("CONTAINER_FULL")}
  position: relative;
  height: var(--Hero-height, ${fluidScale("540px", "400px")});
  overflow: auto;
`;

export const HeroImage = styled(Image)`
  --Hero-object-position: ${({ $focalPointX, $focalPointY }) =>
    `${$focalPointX}% ${$focalPointY}%;`}
  width: 100%;

  /* stylelint-disable declaration-no-important */
  height: 100% !important;
  object-fit: cover;
  object-position: var(--Hero-object-position, center);
`;
