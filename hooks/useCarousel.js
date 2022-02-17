import { useState, useEffect, useRef, useCallback } from "react";
import { useUID } from "react-uid";

const DEFAULT_OPTIONS = {
  selectedAttraction: 0.075,
  friction: 0.48,
  pageDots: false,
  prevNextButtons: false,
  lazyLoad: true,
  adaptiveHeight: false,
  initialIndex: 0,
  ariaLabel: "Slideshow",
  wrapAround: true,
  percentPosition: false,
};

/**
 * useCarousel
 *
 * Use Flickity (https://flickity.metafizzy.co/) as a hook,
 * with additional accessibility features based on the WAI-ARIA carousel pattern
 * (https://www.w3.org/TR/wai-aria-practices-1.1/examples/carousel/carousel-1.html)
 */
export default function useCarousel(options) {
  const flickity = useRef(null);
  const carouselRef = useRef(null);
  const uid = useUID();

  const mergedOptions = Object.assign({}, DEFAULT_OPTIONS, options);

  const [active, setActiveIndex] = useState(mergedOptions.initialIndex);
  const [length, setLength] = useState(0);

  // async load flickity, attach to ref, and bind active state change to internal flickity `change` event
  useEffect(() => {
    async function loadFlickity() {
      const Flickity = (await import("flickity")).default;
      flickity.current = new Flickity(carouselRef.current, mergedOptions);
      setLength(flickity.current?.cells.length);
      flickity.current.on("change", (index) => setActiveIndex(index));
    }

    loadFlickity();

    // destroy flickity instance in clean-up
    return () => {
      if (!flickity.current) return;
      flickity.current.destroy();
    };
  }, [JSON.stringify(mergedOptions)]); // eslint-disable-line react-hooks/exhaustive-deps

  // call flickity's `select` event when active state changes
  // required for using custom button and pager components
  useEffect(() => {
    if (!flickity.current) return;
    flickity.current.select(active);
  }, [active]);

  const setActive = useCallback((index) => setActiveIndex(index), []);

  const carouselProps = {
    ref: carouselRef,
    id: uid,
    "aria-roledescription": "carousel",
    "aria-label": mergedOptions.ariaLabel,
  };

  const slideProps = {
    role: "group",
    "aria-roledescription": "slide",
  };

  const prevButtonProps = {
    "aria-controls": uid,
    "aria-disabled": !mergedOptions.wrapAround && active === 0,
    get onClick() {
      if (this["aria-disabled"]) return;
      return () =>
        setActiveIndex((prevActive) =>
          prevActive === 0 ? length - 1 : prevActive - 1
        );
    },
  };

  const nextButtonProps = {
    "aria-controls": uid,
    "aria-disabled": !mergedOptions.wrapAround && active === length - 1,
    get onClick() {
      if (this["aria-disabled"]) return;
      return () =>
        setActiveIndex((prevActive) =>
          prevActive === length - 1 ? 0 : prevActive + 1
        );
    },
  };

  const pageDotProps = {
    "aria-controls": uid,
  };

  return {
    active,
    setActive,
    length,
    carouselProps,
    slideProps,
    prevButtonProps,
    nextButtonProps,
    pageDotProps,
  };
}
