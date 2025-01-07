import styled from "styled-components";
import { respond } from "@/styles/globalStyles";

export const HeroWrapper = styled.div`
  display: grid;
  grid-template-rows: 50px 1fr;
  grid-template-columns: 40% 60%;
  gap: 0px;
  align-items: center;
  background-color: var(--black);
  ${respond(`grid-template-columns: 10% 90%;`)}
`;

export const Flag = styled.h4`
  z-index: 1;
  grid-area: 1 / 1 / 2 / 3;
  place-self: start;
  padding: 1em 2em;
  margin-left: 4vw;
  color: var(--white);
  background-color: var(--red40);
`;

export const NewsHero = styled.div`
  grid-area: 1 / 1 / 3 / 3;
  border-top: 10px solid var(--red40);

  > div:first-child img {
    filter: brightness(50%) grayscale(30%) sepia(60%) hue-rotate(320deg);
    ${respond(`min-height: 75vh;`)}
  }
`;

export const HeroContainer = styled.div`
  grid-area: 1 / 1 / 3 / 3;

  img {
    ${respond(`min-height: 50vh;`)}
  }
`;

export const HeroContent = styled.div`
  z-index: 1;
  grid-area: 1 / 2 / 3 / 3;
  max-width: 40em;
  padding-right: 2vw;
  padding-bottom: 2em;
  color: var(--white);
  text-shadow: 0px 0px 8px var(--black);

  a {
    text-shadow: none;
  }

  ${respond(`
    align-self: end;
    padding-bottom: 110px;
  `)}
`;

export const Details = styled.div`
  a {
    margin-top: 1em;
  }

  ${respond(`
    span {
      display: none;
    }
  `)}
`;

export const TabsContainer = styled.div`
  position: relative;
  top: -60px;
  ${respond(`top: -80px;`)}
`;
