"use client";
import { token } from "@rubin-epo/epo-react-lib";
import styled from "styled-components";

export const Aside = styled.aside`
  --size-width-aside: 270px;
  --size-gap-aside: var(--size-spacing-xs);
  --color-font-link-aside: var(--turquoise60);
  --color-background-accent-aside: var(--turquoise55, #009fa1);

  display: flex;
  flex-wrap: wrap;
  gap: var(--size-gap-aside);
  padding: 0;
  margin: 0;
  font-size: 0.875rem;

  & a {
    & img {
      opacity: 1;
      transition: filter 0.2s ease 0s, opacity 0.2s ease 0s;
    }

    &:hover,
    &:focus-visible {
      text-decoration: underline;

      & img {
        filter: invert(25%) sepia(80%) saturate(102%) hue-rotate(130deg)
          brightness(100%) contrast(100%);
        opacity: 0.7;
      }
    }
  }

  @media screen and (min-width: ${token("BREAK_DESKTOP_SMALL")}) {
    gap: 0;
    padding: var(--size-spacing-l) 0 var(--size-spacing-l)
      var(--size-spacing-xs);

    > * + * {
      margin-block-start: var(--size-spacing-2xs);
    }
  }
`;
