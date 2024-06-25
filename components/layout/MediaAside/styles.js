import styled from "styled-components";
import { respond } from "@/styles/globalStyles";

export const Aside = styled.aside`
  padding: 100px 0 100px 10px;

  ${respond(`
    padding: 30px 0 0 0;
  `)}

  h3 {
    position: relative;
    padding-right: 32px;
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
    border-bottom: 8px solid var(--neutral15);

    svg {
      display: none;
    }
  }

  a {
    display: block;
    margin: 20px 0 8px;
    font-size: 14px;
    color: var(--turquoise60);
    text-decoration: none;

    figure {
      > div {
        opacity: 1;
        transition: filter 0.2s, opacity 0.2s;
      }

      figcaption {
        padding-top: 8px;
      }
    }

    &:hover,
    &:focus-visible {
      text-decoration: underline;

      figure > div {
        filter: invert(25%) sepia(80%) saturate(102%) hue-rotate(130deg)
          brightness(100%) contrast(100%);
        opacity: 0.7;
      }
    }
  }
`;

export const AsidePrimary = styled.div`
  h3 {
    &:first-of-type {
      border-bottom: 8px solid var(--turquoise60);

      svg {
        position: absolute;
        top: 4px;
        right: 0;
        display: block;
        width: 32px;
        height: 32px;
        padding: 8px;
        overflow: visible;
        background-color: var(--turquoise60);
        border-radius: 50%;
        fill: var(--white);
      }
    }
  }
`;

export const AsideSecondary = styled.div`
  margin-top: 1em;
`;

export const AsideTags = styled.div`
  margin-top: 1em;

  a {
    display: inline-block;
    margin-right: 6px;
  }
`;
