"use client";

import { PropsWithChildren } from "react";
import { useCarouselContext } from "../../context";
import * as Styled from "./styles";

export default function Wrapper({ children }: PropsWithChildren) {
  const { carouselProps } = useCarouselContext();

  return (
    <Styled.SlidesWrapper {...carouselProps}>{children}</Styled.SlidesWrapper>
  );
}
