import styled from "styled-components";

export const Slides = styled.div`
  display: grid;
  grid-auto-columns: 100%;
  grid-auto-flow: column;
  overflow: auto hidden;

  /* Vertical overscroll passes through to the parent */
  overscroll-behavior: contain auto;
  scroll-snap-type: x mandatory;
  border-radius: var(--slider-border-radius, 16px);

  @media (prefers-reduced-motion: no-preference) {
    scroll-behavior: smooth;
  }
`;
