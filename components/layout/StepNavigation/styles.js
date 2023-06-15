import { fluidScale, pxToEm, respond, tokens } from "@/styles/globalStyles";
import styled from "styled-components";
import { MixedLink } from "@rubin-epo/epo-react-lib";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-inline-start: -50px;
  margin-block-end: -18px;

  > * {
    margin-block-end: 18px;
    margin-inline-start: 50px;
  }
`;

export const Title = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex: 666 1 0%;
  justify-content: space-between;

  h2 {
    flex-grow: 1;
  }

  button {
    display: none;
    flex-shrink: 0;
    align-self: center;
    padding-left: 10px;

    ${respond(`display: flex;`, tokens.BREAK_PHABLET)}
  }
`;

export const Description = styled.div`
  flex-basis: 100%;
`;

export const NavList = styled.ol`
  position: relative;
  flex: 1 1
    ${({ $columns }) =>
      fluidScale(`${400 * $columns}px`, `${300 * $columns}px`)};
  columns: ${({ $columns }) => $columns};
  column-gap: ${fluidScale("50px", "30px")};
  visibility: hidden;
  max-height: 0;

  ${respond(`columns: 1`, tokens.BREAK_PHABLET)}

  &[open] {
    max-height: none;
    visibility: visible;
  }
`;

const NUM_HEIGHT = "31px";

const itemBorder = `
  &::after {
    content: "";
    display: block;
    height: 100%;
    border-right: 5px solid var(--orange20);
    position: absolute;
    left: 13px;
    top: 30px;
  }
`;

export const NavItem = styled.li`
  position: relative;
  counter-increment: guide-nav-counter;
  font-size: ${fluidScale("20px", "16px")};
  font-weight: bold;
  break-inside: avoid;
  border: 1px solid transparent;

  & + & {
    margin-block-start: ${pxToEm(24)};
  }

  ${({ $showBorder }) => $showBorder && itemBorder}

  ${respond(
    `&:not(:last-child) {
      ${itemBorder}
    }`,
    tokens.BREAK_PHABLET
  )}
`;

export const NavLink = styled(MixedLink)`
  text-decoration: none;
  line-height: ${NUM_HEIGHT};
  display: flex;

  &[aria-current="page"] {
    > span {
      color: #db5400;
    }

    &::before {
      background-color: #f80;
    }
  }

  &[aria-current="page"],
  &:hover {
    > span {
      text-decoration: underline;
    }
  }

  &::before {
    z-index: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: ${NUM_HEIGHT};
    height: ${NUM_HEIGHT};
    margin-inline-end: ${fluidScale("30px", "7px")};
    content: counter(guide-nav-counter);
    background-color: ${({ $active }) =>
      $active ? "#ff8800" : "var(--orange20)"};
    border-radius: 100%;
    transition: background-color 0.2s;
  }

  &:hover::before,
  &.focus-visible::before {
    background-color: ${({ $active }) =>
      $active ? "#ff8800" : "var(--orange55)"};
  }
`;
