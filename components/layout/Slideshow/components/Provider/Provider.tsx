"use client";

import { FunctionComponent, ReactNode } from "react";
import { CarouselConfig, CarouselOptions } from "../../types";
import useCarousel from "../../hook";
import CarouselContext from "../../context";

export interface ProviderProps {
  options: CarouselOptions;
  children: ReactNode;
}

const Provider: FunctionComponent<ProviderProps> = ({ options, children }) => {
  const value: CarouselConfig = useCarousel(options);

  return (
    <CarouselContext.Provider value={value}>
      {children}
    </CarouselContext.Provider>
  );
};

Provider.displayName = "Carousel.Provider";

export default Provider;
