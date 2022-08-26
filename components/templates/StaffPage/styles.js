import styled from "styled-components";
import { fluidScale, respond, containerRegular } from "@/styles/globalStyles";

const WIDE_BREAKPOINT = "1125px";
const MOBILE_BREAKPOINT = "475px";

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
    content: "“";
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 100%;
    transform: translateX(50%);
    color: var(--turquoise50);
    font-size: ${fluidScale(
      "250px",
      "132px",
      WIDE_BREAKPOINT,
      MOBILE_BREAKPOINT
    )};
    font-weight: normal;
    line-height: 0;

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

export const SectionHeading = styled.h2`
  margin-block-end: 0.5em;
  padding-block-end: 0.5em;
  border-block-end: 10px solid var(--turquoise50);
`;

export const TradingCardLink = styled.a`
  display: block;
  max-width: 270px;
`;

export const TagList = styled.ul``;

export const Tag = styled.li`
  display: inline-block;
  margin-inline-end: 1.2em;
`;

export const Link = styled.a`
  color: var(--turquoise70);

  &::before {
    content: "#";
  }
`;
