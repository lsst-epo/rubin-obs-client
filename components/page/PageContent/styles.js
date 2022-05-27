import styled from "styled-components";
import HeroComponent from "@/page/Hero";
import {
  fluidScale,
  respond,
  containerRegular,
  containerNarrow,
  tokens,
  PADDING_LARGE,
} from "@/styles/globalStyles";

const WIDE_BREAKPOINT = "1125px";
const NARROW_BREAKPOINT = "800px";
const MOBILE_BREAKPOINT = "475px";
const HERO_OVERLAP = "clamp(-150px, -10vw, -80px)";
const MAIN_INLINE_PADDING = `${fluidScale("50px", tokens.PADDING_SMALL)}`;

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

export const FullLayout = styled.article`
  ${({ $hasSidebar }) =>
    $hasSidebar
      ? `
      display: flex;
      ${containerRegular()}`
      : ``}

  ${respond(`display: block;`, WIDE_BREAKPOINT)}
`;

export const OverlapLayout = styled.article`
  --hero-overlap: ${HERO_OVERLAP};

  display: flex;
  ${({ $hasSidebar }) =>
    $hasSidebar
      ? containerRegular()
      : `
    ${containerNarrow()}
    max-width: calc(var(--max-width) + 2 * ${MAIN_INLINE_PADDING});
  `}

  ${respond(`display: block;`, WIDE_BREAKPOINT)}

  ${respond(`padding-inline: 0;`, NARROW_BREAKPOINT)}

  &:last-child {
    padding-block-end: ${PADDING_LARGE};
  }
`;

export const Main = styled.div`
  --PageContent-Main-padding-block-start: 55px;
  --PageContent-Main-padding-inline: ${MAIN_INLINE_PADDING};
  position: relative;
  flex-grow: 1;
  margin-block-start: var(--hero-overlap);
  padding: var(--PageContent-Main-padding-block-start)
    var(--PageContent-Main-padding-inline) 0;
  background-color: var(--white);

  > * + * {
    margin-block-start: ${MAIN_INLINE_PADDING};
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
