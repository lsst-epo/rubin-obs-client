import styled from "styled-components";
import HeroComponent from "@/components/molecules/Hero";
import {
  fluidScale,
  respond,
  containerRegular,
  containerNarrow,
  tokens,
  PADDING_LARGE,
} from "@/styles/globalStyles";
import { token } from "@rubin-epo/epo-react-lib";

const WIDE_BREAKPOINT = token("BREAK_DESKTOP_SMALL");
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
  --hero-overlap: ${HERO_OVERLAP};
`;

export const FullLayout = styled.article`
  &[data-sidebar="false"] {
    display: block;
  }

  &[data-sidebar="true"] {
    display: flex;
    flex-direction: column;
    ${containerRegular()}
  }

  @media screen and (min-width: ${WIDE_BREAKPOINT}) {
    &[data-sidebar="true"] {
      flex-direction: row;
    }
  }
`;

export const OverlapLayout = styled.article`
  --hero-overlap: ${HERO_OVERLAP};

  &[data-sidebar="false"] {
    display: block;
    ${containerNarrow()}
    max-width: calc(var(--max-width) + 2 * ${MAIN_INLINE_PADDING});
  }

  &[data-sidebar="true"] {
    display: flex;
    flex-direction: column;
    ${containerRegular()}
  }

  ${respond(`padding-inline: 0;`, NARROW_BREAKPOINT)}

  @media screen and (min-width: ${WIDE_BREAKPOINT}) {
    &[data-sidebar="true"] {
      flex-direction: row;
    }
  }

  &:last-child {
    padding-block-end: ${PADDING_LARGE};
  }
`;

export const Main = styled.div`
  --PageContent-Main-padding-block-start: 55px;
  --PageContent-Main-padding-inline: ${MAIN_INLINE_PADDING};

  position: relative;
  flex-grow: 1;
  padding: var(--PageContent-Main-padding-block-start)
    var(--PageContent-Main-padding-inline) 0;
  margin-block-start: var(--hero-overlap);
  background-color: var(--white);

  > * + * {
    margin-block-start: ${MAIN_INLINE_PADDING};
  }
`;

export const Aside = styled.aside`
  --PageContent-Aside-padding-inline: ${MAIN_INLINE_PADDING};

  flex-basis: 270px;
  flex-shrink: 0;
  margin-block-start: min(4.25vw, 64px);

  ${respond(
    `padding: 0 var(--PageContent-Aside-padding-inline);`,
    WIDE_BREAKPOINT
  )}

  > * + * {
    margin-block-start: min(4.25vw, 64px);
  }
`;
