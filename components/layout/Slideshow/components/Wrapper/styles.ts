import styled from "styled-components";

export const SlidesWrapper = styled.div`
  --slider-aspect-ratio: 16 / 9;

  position: relative;

  [data-dark-mode="true"] & {
    color: var(--white, #fff);
  }
`;
