"use client";
import styled from "styled-components";
import { fluidScale, respond, containerRegular } from "@/styles/globalStyles";
import AsideSection from "@/components/molecules/Aside/Section";
import { token } from "@rubin-epo/epo-react-lib";

const WIDE_BREAKPOINT = token("BREAK_DESKTOP_SMALL");
const MOBILE_BREAKPOINT = "475px";

export const TradingCardSection = styled(AsideSection)`
  max-width: var(--size-width-aside);
`;

export const QuotePositioner = styled.div`
  position: absolute;
  inset-block-start: calc(50% - var(--hero-overlap) * -0.5);
  inline-size: 100%;
  transform: translateY(-50%);
`;

export const Quote = styled.div`
  ${containerRegular()}
  display: flex;
  justify-content: flex-end;
`;

export const QuoteInner = styled.div`
  position: relative;
  flex-basis: 50%;
  font-size: ${fluidScale("26px", "18px")};
  font-weight: bold;

  &::before {
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 100%;
    font-size: ${fluidScale(
      "250px",
      "132px",
      WIDE_BREAKPOINT,
      MOBILE_BREAKPOINT
    )};
    font-weight: normal;
    line-height: 0;
    color: var(--turquoise50);
    content: "“";
    transform: translateX(50%);

    ${respond(
      `
      inset-block-start: 16%;
      inset-inline-end: 110%;`,
      MOBILE_BREAKPOINT
    )}
  }
`;

export const Bio = styled.div`
  margin-block-start: 0.5em;
`;

export const TradingCardLink = styled.a`
  display: block;
`;

export const Link = styled.a`
  color: var(--turquoise70);

  &::before {
    content: "#";
  }
`;
