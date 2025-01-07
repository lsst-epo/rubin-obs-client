import { fluidScale, token } from "@rubin-epo/epo-react-lib";
import styled from "styled-components";

export const Aside = styled.aside`
  --size-width-aside: 270px;
  --size-gap-aside: ${fluidScale("50px", token("PADDING_SMALL"))};
  --color-font-link-aside: var(--turquoise60);
  --color-background-accent-aside: var(--turquoise55, #009fa1);

  display: flex;
  flex-shrink: 0;
  flex-basis: 270px;
  flex-wrap: wrap;
  gap: var(--size-gap-aside);
  padding: 0;
  margin: 0;

  & a {
    font-size: 14px;
    color: var(--color-background-accent-aside);
    text-decoration: none;

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
    flex-direction: column;
    gap: 0;
    padding: var(--PADDING_LARGE) 0 var(--PADDING_LARGE) 10px;

    > * + * {
      margin-block-start: 1em;
    }
  }
`;
