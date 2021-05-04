import styled from "styled-components";

export const StyledSlider = styled.div`
  .slick-list,
  .slick-slider,
  .slick-track {
    position: relative;
    display: block;
  }

  .slick-loading {
    .slick-slide,
    .slick-track {
      visibility: hidden;
    }
  }

  .slick-slider {
    box-sizing: border-box;
    user-select: none;
    touch-action: pan-y;
  }

  .slick-list {
    overflow: hidden;
    margin: 0;
    padding: 0;

    &:focus {
      outline: 0;
    }

    &.dragging {
      cursor: pointer;
      cursor: hand;
    }
  }

  .slick-slider {
    .slick-list,
    .slick-track {
      transform: translate3d(0, 0, 0);
    }
  }

  .slick-track {
    top: 0;
    left: 0;

    &:after,
    &:before {
      display: table;
      content: "";
    }

    &:after {
      clear: both;
    }
  }

  .slick-slide {
    display: none;
    float: left;
    height: 100%;
    min-height: 1px;
  }

  [dir="rtl"] .slick-slide {
    float: right;
  }

  .slick-slide {
    img {
      display: block;
    }

    &.slick-loading img {
      display: none;
    }

    &.dragging img {
      pointer-events: none;
    }
  }

  .slick-initialized .slick-slide {
    display: block;
  }

  .slick-vertical .slick-slide {
    display: block;
    height: auto;
    border: 1px solid transparent;
  }

  .slick-arrow.slick-hidden {
    display: none;
  }

  .slick-arrow {
    @media (max-width: 900px) {
      display: none !important;
    }
  }

  .slick-dots,
  .slick-next,
  .slick-prev {
    position: absolute;
    display: block;
    padding: 0;
  }

  .slick-loading .slick-list {
    position: relative;
    display: block;

    &:before {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      content: "...";
    }
  }

  .slick-next,
  .slick-prev {
    top: 50%;
    width: 20px;
    height: 20px;
    transform: translate(0, -50%);
    cursor: pointer;
    color: transparent;
    border: none;
    outline: 0;
    background: 0 0;
    background-color: gray;
    border-radius: 100%;
    padding: 30px;
    z-index: 9;
    @media (max-width: 900px) {
      display: none;
    }
  }

  .slick-next,
  .slick-prev {
    &:focus,
    &:hover {
      color: transparent;
      outline: 0;
      background: 0 0;
      background-color: lightgray;
    }
    &:focus:before,
    &:hover:before {
      opacity: 1;
    }
  }

  .slick-next.slick-disabled:before,
  .slick-prev.slick-disabled:before {
    opacity: 0.25;
  }

  .slick-next:before {
    position: absolute;
    width: 22px;
    height: 22px;
    top: 19px;
    left: 23px;
    content: url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon fill='white' points='15.212 22.283 5.204 12 15.212 1.717 18.796 5.203 12.181 12 18.796 18.797 15.212 22.283' /%3E%3C/svg%3E%0A");
    transform: rotate(180deg);
  }

  .slick-prev {
    &:before {
      position: absolute;
      width: 22px;
      height: 22px;
      top: 17px;
      left: 16px;
      content: url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon fill='white' points='15.212 22.283 5.204 12 15.212 1.717 18.796 5.203 12.181 12 18.796 18.797 15.212 22.283' /%3E%3C/svg%3E%0A");
    }
    left: -50px;
  }

  [dir="rtl"] .slick-prev {
    left: auto;
    right: -50px;
  }

  .slick-next:before,
  [dir="rtl"] .slick-prev:before {
    content: url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon fill='white' points='15.212 22.283 5.204 12 15.212 1.717 18.796 5.203 12.181 12 18.796 18.797 15.212 22.283' /%3E%3C/svg%3E%0A");
  }

  .slick-next {
    right: -50px;
  }

  [dir="rtl"] .slick-next {
    right: auto;
    left: -50px;

    &:before {
      content: url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon fill='white' points='15.212 22.283 5.204 12 15.212 1.717 18.796 5.203 12.181 12 18.796 18.797 15.212 22.283' /%3E%3C/svg%3E%0A");
    }
  }

  .slick-dotted.slick-slider {
    margin-bottom: 30px;
  }

  .slick-dots {
    display: none !important;
    bottom: -25px;
    width: 100%;
    margin: 0;
    list-style: none;
    text-align: center;

    @media (max-width: 900px) {
      display: block !important;
    }

    li {
      position: relative;
      display: inline-block;
      width: 20px;
      height: 20px;
      margin: 0 5px;
      padding: 0;
      cursor: pointer;

      button {
        font-size: 0;
        line-height: 0;
        display: block;
        width: 20px;
        height: 20px;
        padding: 5px;
        cursor: pointer;
        color: transparent;
        border: 0;
        outline: 0;
        background: 0 0;

        &:focus,
        &:hover {
          outline: 0;
        }

        &:focus:before,
        &:hover:before {
          opacity: 1;
        }

        &:before {
          font-size: 6px;
          line-height: 20px;
          position: absolute;
          top: 0;
          left: 0;
          width: 20px;
          height: 20px;
          content: "•";
          text-align: center;
          border-radius: 100%;
          background-color: var(--turquoise80);
          color: var(--turquoise80);
        }
      }

      &.slick-active button:before {
        opacity: 0.75;
        background-color: var(--turquoise50);
        color: var(--turquoise50);
      }
    }
  }
  @media (max-width: 1100px) {
    .slick-next {
      right: 0 !important;
    }
    .slick-prev {
      left: 0 !important;
    }
    [dir="rtl"] .slick-next {
      left: 0 !important;
    }
    [dir="rtl"] .slick-prev {
      right: 0 !important;
    }
  }
`;
