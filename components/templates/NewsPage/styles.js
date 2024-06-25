import styled from "styled-components";
import {
  containerWide,
  containerFullBleed,
  fluidScale,
  ptToEm,
  respond,
  tokens,
} from "@/styles/globalStyles";
import { aHidden } from "@/styles/mixins/appearance";
import { IconComposer, Image } from "@rubin-epo/epo-react-lib";

export const Hero = styled.div`
  ${containerFullBleed("CONTAINER_FULL")}
  position: relative;
  height: var(--Hero-height, ${fluidScale("540px", "400px")});
  overflow: auto;
`;

export const HeroFigure = styled.figure`
  ${containerFullBleed("CONTAINER_FULL")}
  position: relative;

  section {
    padding-top: 0;
    padding-bottom: 0;
  }
`;

export const HeroImageContainer = styled.div`
  ${containerFullBleed("CONTAINER_FULL")}
  position: relative;
  height: var(--Hero-height, ${fluidScale("540px", "400px")});
  overflow: auto;
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

export const HeroImage = styled(Image)`
  --Hero-object-position: ${({ $focalPointX, $focalPointY }) =>
    `${$focalPointX}% ${$focalPointY}%;`}

  width: 100%;
  /* stylelint-disable declaration-no-important */
  height: 100% !important;
  object-fit: cover;
  object-position: var(--Hero-object-position, center);
`;

export const Article = styled.article`
  z-index: 1;
  margin-top: var(--Hero-caption-offset);
  background-color: white;

  @media (max-width: ${tokens.BREAK_TABLET}) {
    margin-top: auto;
  }
`;

export const NewsDetail = styled.div`
  ${containerFullBleed("CONTAINER_REGULAR")}
  display: grid;
  ${(props) =>
    props.$showAside
      ? "grid-template-columns: minmax(75%, 1fr) minmax(25%, 250px)"
      : "grid-template-columns: 1fr"};
  ${respond(`${containerWide()}`, "1360px")}
  ${respond(`grid-template-columns: 1fr;`)}
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
`;

export const Pretitle = styled.div`
  padding-bottom: 10px;
`;

export const Subtitle = styled.div`
  padding-top: 10px;
`;

export const SubtitleSecondary = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const ArticleHeading = styled.h3`
  padding-top: 48px;
`;

export const ContactList = styled.ul`
  display: block;

  + ul {
    margin-top: 25px;
  }
`;

export const ContactListItem = styled.li`
  display: flex;
  align-items: center;

  + & {
    margin-top: 10px;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 3px;
  margin-right: 10px;

  &.telephone {
    padding-top: 2px;
  }

  &.email {
    width: 30px;
    height: 20px;
    padding-top: 2px;
    padding-left: 0;
    margin-right: 7px;
  }
`;

export const ContactListItemIcon = styled(IconComposer)`
  color: ${tokens.turquoise60};
`;
