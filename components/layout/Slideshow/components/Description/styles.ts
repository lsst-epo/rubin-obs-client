import styled from "styled-components";
import { IconComposer } from "@rubin-epo/epo-react-lib";
import { BREAK_TABLET_LG } from "../../constants";
import { DownloadLink } from "../DownloadLink/styles";

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: start;
  opacity: 1;
  transition: opacity 0.3s, display 0.3s allow-discrete;

  @media (min-width: ${BREAK_TABLET_LG}) {
    padding-block: 24px 16px;
    padding-inline: 30px;
    overflow-y: auto;
  }

  /* Overrides global transition duration. The animation is a fade, not motion. */
  @media (prefers-reduced-motion: reduce) {
    /* stylelint-disable-next-line declaration-no-important */
    transition-duration: 0.3s !important;
  }

  @starting-style {
    opacity: 0;
  }

  &[inert] {
    display: none;
    opacity: 0;
  }

  & a,
  & button {
    transition: color 0.2s;

    &:hover {
      color: hsla(181deg, 76%, 54%, 100%);
    }
  }
`;

export const Header = styled.h3`
  font-size: 28px; /* 32px */
  font-weight: 700;
  line-height: 1.15;
`;

export const Teaser = styled.div`
  & > * + * {
    margin-block-start: 0.8em;
  }
`;

export const Body = styled.div<{ $hidden?: boolean }>`
  & > * + * {
    margin-block-start: 0.8em;
  }

  ${({ $hidden }) =>
    $hidden &&
    `
    display: none;
  `}
`;

export const ReadmoreWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 16px;
  justify-content: space-between;
  inline-size: 100%;
  margin-block-start: 12px;

  @media (min-width: ${BREAK_TABLET_LG}) {
    margin-block-start: 0px;

    ${DownloadLink} {
      display: none;
    }
  }
`;

export const ReadmoreButton = styled.button`
  --readmore-svg-rotation: rotate(-90deg);

  display: flex;
  gap: 8px;
  align-items: center;

  &[aria-pressed="true"] {
    --readmore-svg-rotation: rotate(90deg);
  }
`;

export const ReadmoreSvg = styled(IconComposer)`
  inline-size: 16px;
  block-size: 16px;
  transition: transform 0.2s;
  transform: var(--readmore-svg-rotation);
`;
//
