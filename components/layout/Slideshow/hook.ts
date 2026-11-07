"use client";

import { useState, useEffect, useRef, useId } from "react";
import { CarouselConfig, CarouselOptions } from "./types";

const DEFAULT_OPTIONS: Omit<Required<CarouselOptions>, "ariaLabelledBy"> = {
  adaptiveHeight: false,
  initialIndex: 0,
  ariaLabel: "Slideshow",
  wrapAround: true,
  length: 0,
};

/**
 * useCarousel
 *
 * For CSS carousels.
 * Provides accessibility features based on the WAI-ARIA carousel pattern:
 * (https://www.w3.org/TR/wai-aria-practices-1.1/examples/carousel/carousel-1.html)
 */
export default function useCarousel(options: CarouselOptions): CarouselConfig {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

  const carouselRef = useRef<HTMLDivElement>(null);

  const length = mergedOptions.length;

  const sliderRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(mergedOptions.initialIndex);

  const uid = useId();

  // A11y tools and CSS styles will break if ID contains ":"
  const carouselId = uid.replace(/:/g, "");

  // Slide being scrolled to programmatically. Smooth scrolling passes over
  // intermediate slides, which must not become active along the way.
  const scrollTargetRef = useRef<number | null>(null);

  /** Scroll to the active slide */
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    const clientWidth = slider.clientWidth;

    if (Math.round(slider.scrollLeft / clientWidth) === active) return;

    scrollTargetRef.current = active;
    slider.scrollTo({
      left: active * clientWidth,
      top: 0,
    });
  }, [active]);

  /** Track which slide is in view */
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const slides = Array.from(slider.children);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const index = slides.indexOf(entry.target);
          const target = scrollTargetRef.current;

          if (target !== null && index !== target) return;

          scrollTargetRef.current = null;
          setActive(index);
        });
      },
      { root: slider, threshold: 0.5 }
    );

    slides.forEach((slide) => observer.observe(slide));

    return () => observer.disconnect();
  }, [length]);

  const nextSlide = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    e?.stopPropagation();

    if (!sliderRef.current) return;

    setActive((active) =>
      active < length - 1 ? active + 1 : mergedOptions.wrapAround ? 0 : active
    );
  };

  const prevSlide = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    e?.stopPropagation();

    if (!sliderRef.current) return;

    setActive((active) =>
      active > 0 ? active - 1 : mergedOptions.wrapAround ? length - 1 : 0
    );
  };

  const carouselProps = {
    ref: carouselRef,
    "aria-roledescription": "carousel",
    ...(mergedOptions.ariaLabelledBy
      ? {
          "aria-labelledby": mergedOptions.ariaLabelledBy,
        }
      : {
          "aria-label": mergedOptions.ariaLabel,
        }),
  };

  const sliderProps = {
    ref: sliderRef,
    id: carouselId,
  };

  const slideProps = {
    role: "group",
    "aria-roledescription": "slide",
  };

  const prevButtonProps = {
    "aria-controls": carouselId,
    "aria-disabled": !mergedOptions.wrapAround && active === 0,
    onClick: prevSlide,
  };

  const nextButtonProps = {
    "aria-controls": carouselId,
    "aria-disabled": !mergedOptions.wrapAround && active === length - 1,
    onClick: nextSlide,
  };

  const pageDotProps = {
    "aria-controls": carouselId,
  };

  const arr = Array.from(Array(length).keys());
  const slideIds = arr.map((i) => `${sliderProps.id}_${i}`);

  return {
    active,
    setActive,
    length,
    carouselProps,
    sliderProps,
    slideProps,
    prevButtonProps,
    nextButtonProps,
    pageDotProps,
    slideIds,
  };
}
