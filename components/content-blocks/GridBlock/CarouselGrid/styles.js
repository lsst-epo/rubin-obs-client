import styled from "styled-components";
import { CarouselLayout as CarouselComponent } from "@rubin-epo/epo-react-lib";

export const Carousel = styled(CarouselComponent)`
  --PrevButton-right: calc(100% + 30px);
  --NextButton-left: calc(100% + 30px);
  --Carousel-Button-outline-color: var(--black);
  --Tile-hover-outline-offset: -3px;

  .flickity-viewport {
    transition: height 0.4s;
  }
`;
