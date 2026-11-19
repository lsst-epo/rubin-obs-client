"use client";

import { PropsWithChildren } from "react";
import { useCarouselContext } from "../../context";
import * as Styled from "./styles";

interface Props extends PropsWithChildren {
  className?: string;
}

export default function Slider({ children, className }: Props) {
  const { sliderProps } = useCarouselContext();

  return (
    <Styled.Slides className={className} {...sliderProps}>
      {children}
    </Styled.Slides>
  );
}
