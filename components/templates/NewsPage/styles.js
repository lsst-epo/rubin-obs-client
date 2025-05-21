"use client";
import styled from "styled-components";
import {
  containerWide,
  containerFullBleed,
  ptToEm,
  respond,
  tokens,
} from "@/styles/globalStyles";
import { aHidden } from "@/styles/mixins/appearance";
import { token } from "@rubin-epo/epo-react-lib";

export const HeroFigure = styled.figure`
  ${containerFullBleed("CONTAINER_FULL")}
  position: relative;

  section {
    padding-top: 0;
    padding-bottom: 0;
  }
`;

export const HeroFigCaption = styled.figcaption`
  ${aHidden}
`;

export const HeroCaption = styled.div`
  display: block;
  padding-bottom: 40px;
  font-size: ${ptToEm("12pt")};
  line-height: 1.428;
`;

export const Article = styled.article`
  z-index: 1;
  margin-block-start: calc(var(--size-spacing-l) * -1);
  background-color: white;

  @media (max-width: ${tokens.BREAK_TABLET}) {
    margin-block-start: auto;
  }
`;

export const NewsDetail = styled.div`
  ${containerFullBleed("CONTAINER_REGULAR")}
  display: grid;
  grid-template-columns: 1fr;

  ${respond(`${containerWide()}`, "1360px")}
  ${(props) =>
    props.$showAside &&
    `${Article} > section > div {
      padding-left: 40px;
      padding-right: 40px;

      @media (max-width: ${tokens.BREAK_LARGE_TABLET}) {
        padding-left: 20px;
        padding-right: 20px;
      }

      @media (max-width: ${tokens.BREAK_TABLET}) {
        padding-left: 0;
        padding-right: 0;
      }

      @media (max-width: "720px") {
        max-width: 94vw;
      }
    }
  `}

  @media screen and (min-width: ${token("BREAK_DESKTOP_SMALL")}) {
    ${(props) =>
      props.$showAside
        ? "grid-template-columns: minmax(75%, 1fr) minmax(25%, 250px)"
        : "grid-template-columns: 1fr"};
  }
`;
