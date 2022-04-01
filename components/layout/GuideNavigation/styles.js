import { fluidScale, pxToEm, respond, tokens } from "@/styles/globalStyles";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-inline-start: -60px;
  margin-block-end: -18px;

  > * {
    margin-inline-start: 60px;
    margin-block-end: 18px;
  }
`;

export const Title = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: space-between;

  button {
    display: none;

    ${respond(`display: block;`, tokens.BREAK_PHABLET)}
  }
`;

export const NavList = styled.ol`
  position: relative;
  flex: 1 1 ${tokens.BREAK_TABLET};
  columns: 2;
  column-gap: ${fluidScale("60px", "30px")};
  visibility: hidden;
  max-height: 0;

  ${respond(`columns: 1`, tokens.BREAK_PHABLET)}

  &[open] {
    visibility: visible;
    max-height: none;
  }
`;

const NUM_HEIGHT = "31px";

export const NavItem = styled.li`
  position: relative;
  counter-increment: guide-nav-counter;
  font-weight: bold;
  display: flex;
  break-inside: avoid;
  border: 1px solid transparent;

  & + & {
    margin-block-start: ${pxToEm(18)};
  }

  &:before {
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: ${NUM_HEIGHT};
    height: ${NUM_HEIGHT};
    margin-inline-end: ${fluidScale("30px", "7px")};
    content: counter(guide-nav-counter);
    border-radius: 100%;
    background-color: ${({ $active }) =>
      $active ? "#ff8800" : "var(--orange20)"};
    transition: background-color 0.2s;
    z-index: 1;
  }

  &:focus-within:before {
    background-color: ${({ $active }) =>
      $active ? "#ff8800" : "var(--orange55)"};
  }
`;

export const NavLink = styled.a`
  text-decoration: none;
  line-height: ${NUM_HEIGHT};

  &[aria-current="page"] {
    color: #ff8800;
  }

  &[aria-current="page"],
  &:hover {
    text-decoration: underline;
  }
`;
