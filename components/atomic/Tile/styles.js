/* eslint-disable */
import styled from "styled-components";
import BaseMixedLink from "@rubin-epo/epo-react-lib/MixedLink";
import BaseResponsiveImage from "@rubin-epo/epo-react-lib/ResponsiveImage";
import SharePopupComponent from "@/components/molecules/SharePopup";
import {
  BREAK_PHABLET,
  BREAK_PHABLET_MIN,
  BREAK_TABLET,
  BREAK_TABLET_MIN,
  respond,
} from "@/styles/globalStyles";

/*
Media queries are done this way for special treatment at tablet level vs phone level...
@media (max-width: ${BREAK_PHABLET}) {}
@media (min-width: ${BREAK_PHABLET_MIN}) and (max-width: ${BREAK_TABLET}) {}
*/

export const ResponsiveImage = styled(BaseResponsiveImage)`
  height: 100%;
`;

export const ListItem = styled.li`
  position: relative;
`;

export const MixedLink = styled(BaseMixedLink)`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  align-content: start;
  height: 100%;
  padding: 0;
  text-decoration: none;

  /* HOVER STATES */
  transition: color 0.2s, background-color 0.2s;

  /* set the grid areas for various bits */
  .image {
    grid-area: image;
    overflow: hidden;
  }

  .pretitle {
    grid-area: pretitle;
  }

  .title {
    grid-area: title;
  }

  .subtitle {
    grid-area: subtitle;
  }

  .text {
    grid-area: text;
  }

  .footer {
    grid-area: footer;

    .c-buttonish {
      &:hover {
        outline: none;
      }
    }
  }

  /* FEATURED, only different for desktop */
  &.featured {
    ${respond(
      `
      grid-template-areas:
        "image pretitle"
        "image title"
        "image subtitle"
        "image text"
        "image footer";
      grid-template-columns: 1fr 1fr;
      grid-template-rows: repeat(3, auto) 1fr auto;
      grid-column-gap: 30px;

      .image {
        overflow: hidden;
        min-height: 300px;
      }

      img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
`,
      BREAK_TABLET_MIN,
      "min"
    )}
  }

  &[href] {
    &:hover,
    &.focus-visible {
      outline: 3px solid var(--turquoise85);
      outline-offset: var(--Tile-hover-outline-offset, 1px);
    }
  }

  /* CTA (Also used for Image Grid) */
  &.cta {
    grid-template-areas:
      "image"
      "title";
    grid-row-gap: 0;
    justify-items: center;
    height: 100%;
    color: var(--white);
    background-color: var(--turquoise85);
    border-radius: 16px;

    .image {
      overflow: hidden;
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
      transition: opacity 0.2s;
    }

    .title {
      padding: 20px 5px;
      font-size: 16px;
      font-weight: 700;
      text-align: center;
    }

    .text {
      display: none;
    }

    @media (max-width: ${BREAK_PHABLET}) {
      grid-template: auto / 100px 2fr;
      grid-template-areas: "image title title";
      color: var(--turquoise85);
      background-color: var(--white);

      .image {
        height: 100px;
        border-radius: 16px;

        img {
          width: 100px;
          height: 100px;
          object-fit: cover;
        }
      }

      .title {
        place-self: center left;
        text-align: left;
      }
    }
  }

  /* darkSlides */
  &.darkSlideStaff,
  &.darkSlide {
    padding: 30px;

    &[href] {
      &:hover,
      &.focus-visible {
        outline: none;

        .title {
          text-decoration: underline;
        }
      }
    }

    .image {
      position: relative;
      opacity: 1;
      transition: filter 0.2s, opacity 0.2s;
    }

    .pretitle {
      font-size: 16px;
      font-weight: 700;
    }

    .title {
      font-size: 24px;
      font-weight: 800;
      line-height: 1.2;
    }

    .subtitle {
      font-size: 16px;
      font-weight: 700;
    }

    .text {
      font-size: 18px;
    }

    @media (max-width: ${BREAK_TABLET}) {
      grid-template-areas:
        "image"
        "pretitle"
        "title"
        "text";
      grid-template-columns: 1fr;
      grid-row-gap: 0px;
      padding: 0px;

      .pretitle {
        padding: 0.5rem 0;
        font-weight: normal;
      }

      .title {
        padding: 0 0 1rem;
        font-size: 20px;
      }

      .subtitle {
        display: none;
      }

      && .footer {
        display: none;
      }
    }

    @media (max-width: ${BREAK_PHABLET}) {
      .text {
        display: none;
      }
    }
  }

  /* slideshows and news */
  &.slideshows:not(.featured),
  &.news:not(.featured) {
    grid-template-areas:
      "image"
      "pretitle"
      "title"
      "subtitle"
      "text"
      "footer";
    grid-template-rows: repeat(4, auto) 1fr auto;
  }

  /* note the extra specificity below */
  &&.slideshows,
  &&.news {
    padding: 30px;

    .image {
      position: relative;
      opacity: 1;
      transition: filter 0.2s, opacity 0.2s;
    }

    .pretitle {
      font-size: 16px;
      font-weight: 700;
    }

    .title {
      font-size: 24px;
      font-weight: 800;
      line-height: 1.2;
    }

    .subtitle {
      font-size: 16px;
      font-weight: 700;
    }

    .text {
      font-size: 18px;
    }

    @media (max-width: ${BREAK_PHABLET}) {
      grid-template-areas:
        "image"
        "pretitle"
        "title"
        "subtitle"
        "text"
        "footer";
      grid-template-rows: repeat(4, auto) 1fr auto;
      grid-gap: 0;
      padding: 0px;

      .pretitle {
        padding: 0.5rem 20px;
        font-weight: normal;
      }

      .title {
        padding: 0 20px 1rem;
        font-size: 20px;
      }

      .subtitle {
        display: none;
      }

      .text {
        display: none;
      }

      && .footer {
        display: none;
      }
    }

    @media (min-width: ${BREAK_PHABLET_MIN}) and (max-width: ${BREAK_TABLET}) {
      grid-template: repeat(3, max-content) auto / 1fr 2fr;
      grid-template-areas:
        "image pretitle"
        "image title"
        "image subtitle"
        "image text"
        "image text";

      && .footer {
        display: none;
      }
    }
  }

  /* darkSlide / slideshows make black */
  &.slideshows,
  &.darkSlide {
    color: var(--white);
    background-color: var(--black);
  }

  /* darkSlideStaff only */
  &.darkSlideStaff {
    grid-template-areas:
      "title image"
      "text image"
      "footer image";
    grid-template-columns: 2fr 1fr;
    grid-column-gap: 40px;
    color: var(--white);
    background-color: var(--black);

    .image {
      max-width: 300px;
      clip-path: circle(50%);
    }

    .text {
      padding-top: 10px;
    }

    @media (max-width: ${BREAK_TABLET}) {
      grid-template-areas:
        "image"
        "title"
        "text";
      grid-template-columns: 1fr;
      grid-row-gap: 20px;
      place-items: center;

      .image {
        width: 80vw;
      }

      .title {
        font-size: 24px;
      }
    }
  }

  /* events */
  &.events {
    grid-template-areas:
      "image pretitle footer subtitle"
      "image title title subtitle"
      "image text text subtitle";
    grid-template-columns: 200px 1fr max-content 150px;

    .image {
      margin-right: 30px;
    }

    .pretitle {
      align-self: end;
      font-size: 16px;
      font-weight: 700;
    }

    .title {
      font-size: 20px;
      font-weight: 700;
    }

    .text {
      font-size: 18px;
      font-weight: 400;
    }

    .subtitle {
      display: grid;
      align-items: center;
      padding: 1em;
      color: var(--neutral80);
      text-align: center;
      background-color: var(--neutral10);
    }

    .footer {
      display: grid;
      grid-template: auto / auto;
      grid-auto-flow: column;
      grid-gap: 4px;
      align-items: center;
      justify-self: end;
      padding: 0 10px;
      margin-right: -10px;
      font-size: 14px;
      font-weight: 700;
      color: var(--neutral80);
      white-space: nowrap;

      svg {
        position: relative;
        color: var(--neutral60);
      }
    }

    &.closed {
      .footer {
        background-color: #e6e6e8;
      }
    }

    &.open {
      .footer {
        background-color: var(--turquoise10);
      }
    }

    @media (max-width: ${BREAK_PHABLET}) {
      grid-template: "pretitle footer subtitle" max-content "title title subtitle" auto / 1fr max-content max-content;

      .image {
        display: none;
      }

      .pretitle {
        font-size: 20px;
        font-weight: 400;
      }

      .text {
        display: none;
      }

      .subtitle {
        width: min-content;
      }

      .footer {
        span {
          display: none;
        }
      }
    }

    @media (min-width: ${BREAK_PHABLET_MIN}) and (max-width: ${BREAK_TABLET}) {
      grid-template-areas:
        "pretitle footer subtitle"
        "title title subtitle"
        "text text subtitle";
      grid-template-columns: 1fr max-content max-content;

      .image {
        display: none;
      }

      .subtitle {
        width: min-content;
      }

      .footer {
        span {
          display: none;
        }
      }
    }
  }

  /* jobs */
  &.jobs {
    grid-template-areas:
      "pretitle footer"
      "title title"
      "subtitle subtitle";
    padding: 0 0 30px 30px;
    background-color: var(--turquoise10);

    .pretitle {
      padding-top: 30px;
      font-size: 16px;
      font-weight: 700;
    }

    .title {
      font-size: 24px;
      font-weight: 800;
      line-height: 1.2;
    }

    .subtitle {
      font-size: 16px;
      font-weight: 400;

      svg {
        position: relative;
        left: -4px;
        align-self: flex-start;
      }
    }

    .footer {
      display: grid;
      grid-template: auto / auto;
      grid-auto-flow: column;
      place-items: center;
      padding: 10px;
      font-size: 14px;
      font-weight: 700;
      color: var(--black);
      background-color: var(--turquoise20);
    }

    &.closed {
      background-color: var(--neutral10);

      &:hover {
        color: var(--black);
        background-color: var(--neutral20);
      }

      .footer {
        background-color: var(--neutral15);
      }
    }

    @media (max-width: ${BREAK_TABLET}) {
      .footer {
        span {
          display: none;
        }
      }
    }

    @media (max-width: ${BREAK_PHABLET}) {
      padding: 0 0 20px 20px;

      .pretitle {
        font-size: 18px;
        font-weight: normal;
      }

      .title,
      .subtitle {
        font-size: 18px;
      }
    }
  }

  /* news */
  &&.news {
    color: var(--neutral80);
    background-color: var(--neutral10);

    .footer {
      display: grid;
      grid-template-columns: max-content 1fr;
      place-items: end;
      margin-top: 15px;

      > div {
        color: var(--neutral40);
      }
    }
  }

  /* pages */
  &.pages {
    grid-template-areas:
      "image"
      "subtitle"
      "title"
      "text";

    .image {
      width: 100%;
      opacity: 1;
      transition: filter 0.2s, opacity 0.2s;
    }

    .title {
      font-size: 18px;
      font-weight: 800;
    }

    .text {
      font-size: 18px;
    }

    @media (max-width: ${BREAK_PHABLET}) {
      grid-template-rows: minmax(0, max-content) max-content;
      background-color: light-dark(
        var(--color-background-tile-light),
        var(--black)
      );

      .title,
      .subtitle {
        padding-left: 10px;
      }

      .title {
        padding-bottom: 10px;
      }

      .text {
        display: none;
      }
    }

    @media (min-width: ${BREAK_PHABLET_MIN}) and (max-width: ${BREAK_TABLET}) {
      grid-template: minmax(0, max-content) max-content auto / 1fr 2fr;
      grid-template-areas:
        "image subtitle"
        "image title"
        "image text"
        "image text";
    }
  }

  /* search */
  &.search {
    grid-template-areas:
      "image pretitle"
      "image title"
      "image text"
      "image subtitle";
    grid-template-columns: 200px 1fr;
    padding: 1em;
    border: 1px solid var(--neutral10);

    .image {
      margin-right: 30px;
    }

    .pretitle {
      font-size: 16px;
      font-weight: 700;

      nav {
        background-color: transparent;
      }

      li:last-of-type {
        display: none;
      }
    }

    .title-link {
      text-decoration-color: var(--turquoise85);

      .title {
        font-size: 20px;
        font-weight: 700;
        color: var(--turquoise85);
      }

      &:hover,
      &:focus-visible {
        text-decoration-color: var(--black);

        .title {
          color: var(--black);
        }
      }
    }

    .text {
      font-size: 18px;
      font-weight: 400;
    }

    .subtitle {
      font-size: 16px;
      font-weight: 700;
    }

    @media (max-width: ${BREAK_TABLET}) {
      grid-template-areas:
        "image pretitle"
        "image title"
        "image text"
        "image subtitle";
      grid-template-columns: 100px 1fr;

      .pretitle {
        display: none;
      }
    }

    @media (max-width: ${BREAK_PHABLET}) {
      .pretitle {
        font-size: 18px;
        font-weight: normal;

        a {
          font-size: 18px;
          font-weight: normal;
        }

        ul {
          display: inline;
        }

        li + li::after {
          padding-left: 20px;
          content: ">";
        }
      }

      .title {
        font-size: 18px;
      }

      .subtitle,
      .text {
        display: none;
      }
    }
  }

  /* slideshows */
  &&.slideshows {
    @media (min-width: ${BREAK_PHABLET_MIN}) and (max-width: ${BREAK_TABLET}) {
      grid-template: repeat(2, max-content) auto / 1fr 2fr;
      grid-template-areas:
        "image pretitle"
        "image title"
        "image text"
        "footer text";
    }
  }

  /* staff */
  &.staffProfiles {
    grid-template-areas:
      "image"
      "text"
      "title";
    place-items: start center;
    padding: 24px;
    background-color: var(--neutral10);

    .image {
      order: 1;
      clip-path: circle(50%);
    }

    .title {
      order: 3;
      font-size: 20px;
      font-weight: 700;
      line-height: 1rem;
      text-align: center;
    }

    .text {
      order: 2;
      padding-top: 10px;
      font-size: 14px;
      font-weight: 700;
      text-align: center;
    }

    @media (max-width: ${BREAK_PHABLET}) {
      grid-template: auto auto / 1fr 2fr;
      grid-template-areas:
        "image text text"
        "image title title";
      grid-column-gap: 10px;
      padding: 20px;

      .image {
        margin-right: 10px;
      }

      .title {
        justify-self: left;
        font-size: 16px;
      }

      .text {
        place-self: end left;
        font-size: 16px;
      }
    }
  }

  &.padded-bottom {
    padding-bottom: calc(15px + var(--size-spacing-m));

    @media (max-width: ${BREAK_TABLET}) {
      padding-bottom: 0;
    }
  }

  &.pages:hover,
  &.pages:focus-visible,
  &.darkSlide:hover,
  &.darkSlide:focus-visible,
  &.slideshows:hover,
  &.slideshows:focus-visible,
  &.news:hover,
  &.news:focus-visible {
    .image {
      filter: invert(25%) sepia(80%) saturate(102%) hue-rotate(130deg)
        brightness(100%) contrast(100%);
      outline: none;
      opacity: 0.7;
    }
  }

  &:hover,
  &:focus-visible {
    &.darkSlide {
      color: var(--turquoise55);
    }

    &.events,
    &.jobs {
      color: var(--white);
    }

    &.cta[href] {
      .image {
        outline: none;
        opacity: 0.7;
      }
    }

    &.staffProfiles {
      background-color: var(--neutral20);
    }

    &.events {
      background-color: var(--turquoise85);
    }

    &.jobs {
      background-color: var(--turquoise50);
    }
  }
`;

export const PlayButton = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 6%;
  min-width: 40px;
  height: auto;
  min-height: 40px;
  color: var(--white);
  transform: translate(-50%, -50%);

  &:hover {
    color: var(--neutral15);
  }

  svg {
    width: 100%;
    min-width: 40px;
    height: 100%;
    min-height: 40px;
  }
`;

export const SharePopup = styled(SharePopupComponent)`
  position: absolute;
  inset-block-end: 15px;
  inset-inline-end: 15px;

  @media (max-width: ${BREAK_TABLET}) {
    display: none;
  }
`;
