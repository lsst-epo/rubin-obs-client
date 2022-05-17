import styled from "styled-components";
import HeroComponent from "@/page/Hero";
import {
  fluidScale,
  respond,
  containerRegular,
  tokens,
} from "@/styles/globalStyles";

const WIDE_BREAKPOINT = "1125px";
const NARROW_BREAKPOINT = "800px";
const MOBILE_BREAKPOINT = "475px";
const HERO_OVERLAP = "clamp(-150px, -10vw, -80px)";

export const Hero = styled(HeroComponent)`
  --Hero-height: ${fluidScale(
    "540px",
    "260px",
    WIDE_BREAKPOINT,
    MOBILE_BREAKPOINT
  )};
  --Hero-object-position: 42.5% 50%;

  ${respond(`--Hero-transform: translateY(-10%);`, MOBILE_BREAKPOINT)}
`;

export const Layout = styled.article`
  ${containerRegular()}
  display: flex;

  ${({ $hasHero }) => `--hero-overlap: ${$hasHero ? HERO_OVERLAP : 0};`}

  ${respond(`display: block;`, WIDE_BREAKPOINT)}

  ${respond(`padding-inline: 0;`, NARROW_BREAKPOINT)}
`;

export const Main = styled.div`
  position: relative;
  flex-grow: 1;
  margin-block-start: var(--hero-overlap);
  padding: 55px ${fluidScale("50px", tokens.PADDING_SMALL)} 0;
  background-color: var(--white);

  > * + * {
    margin-block-start: ${fluidScale("50px", tokens.PADDING_SMALL)};
  }
`;

export const Aside = styled.aside`
  flex-shrink: 0;
  flex-basis: 270px;
  margin-block-start: min(4.25vw, 64px);

  ${respond(`display: none;`, WIDE_BREAKPOINT)}

  > * + * {
    margin-block-start: min(4.25vw, 64px);
  }
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
