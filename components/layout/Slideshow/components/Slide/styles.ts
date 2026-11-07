import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const Slide = styled.div`
  aspect-ratio: var(--slider-aspect-ratio);
  color: var(--white, #fff);
  scroll-snap-align: start;
  background-color: var(--neutral98, #161616);

  @supports (animation-timeline: view()) {
    animation: ${fadeIn} linear both;
    animation-timeline: view(inline);
    animation-range: entry 0% entry 100%;

    /* Overrides the global reduced-motion reset; the fade is scroll-linked, not timed. */
    @media (prefers-reduced-motion: reduce) {
      /* stylelint-disable-next-line declaration-no-important */
      animation-duration: auto !important;
    }
  }

  & > div {
    aspect-ratio: var(--slider-aspect-ratio);
  }

  & img {
    inline-size: 100%;
    block-size: 100%;
    /* stylelint-disable-next-line declaration-no-important */
    object-fit: contain !important;
    object-position: center;
    background-color: hsla(0deg, 0%, 9%, 100%);
  }
`;
