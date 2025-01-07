import styled from "styled-components";
import {
  fluidScale,
  BREAK_MOBILE,
  containerRegular,
  respond,
} from "@/styles/globalStyles";

export const FilterNav = styled.nav`
  padding: 12px 0;
  font-size: 16px;
  font-weight: bold;
  color: var(--neutral80);
  background-color: var(--neutral20);
`;

export const FilterGrid = styled.div`
  ${containerRegular()}
  position: relative;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: flex-start;

  > * {
    position: relative;
    flex: 0 1 180px;
  }

  @media (width <= 720px) {
    flex-wrap: wrap;

    > * {
      flex-basis: calc(33.333% - 20px);
    }
  }
`;

export const ToggleButton = styled.button`
  position: relative;
  height: 30px;
  white-space: nowrap;

  > span {
    padding-left: 50px;
  }
  ${respond(`div {display: none;} span {padding-left: 0;}`, BREAK_MOBILE)}
`;

export const ToggleIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  display: block;
  width: 30px;
  height: 4px;
  margin-top: -0.1em;
  background-color: var(--neutral80);

  &::after,
  &::before {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    background-color: var(--neutral80);
  }

  &::before {
    transform: translateY(-9px);
  }

  &::after {
    transform: translateY(9px);
  }
`;

export const SortToggleIcon = styled(ToggleIcon)`
  left: 5px;
  width: 20px;

  &::before {
    left: -5px;
    width: 30px;
  }

  &::after {
    left: 5px;
    width: 10px;
  }
`;

export const ToggleDropdown = styled.ul`
  position: absolute;
  top: 40px;
  z-index: ${(p) => (p.$opened ? 1 : -1)};
  width: 300px;
  visibility: ${(p) => (p.$opened ? "visible" : "hidden")};
  background-color: var(--neutral20);
  opacity: ${(p) => (p.$opened ? 1 : 0)};
  transition: opacity 0.2s;
  ${respond(`width: auto;`, "640px")}

  li {
    a {
      display: block;
      padding: 10px 20px;
      font-weight: normal;
      text-decoration: none;

      &:hover,
      &.active {
        font-weight: bold;
        color: white;
        background-color: var(--turquoise50);
      }
    }

    &:first-of-type {
      margin-top: 20px;
    }
  }
`;

export const FilterSearch = styled.form`
  flex-grow: 1;
  text-align: right;
  white-space: nowrap;

  button {
    height: 50px;
    padding: 4px 5px 4px 15px;
    vertical-align: middle;
    background-color: white;
    border-radius: 25px 0 0 25px;

    svg {
      width: 14px;
      height: 14px;
    }
  }

  input {
    width: ${fluidScale("480px", "200px")};
    height: 50px;
    padding: 4px 6px 5px;
    color: var(--neutral80);
    vertical-align: middle;
    background-color: white;
    border: none;
    border-radius: 0 25px 25px 0;
  }

  @media screen and (width <= 720px) {
    flex-basis: 100%;
    order: -1;
    text-align: start;

    input {
      width: calc(100% - 34px);
    }
  }
`;

export const Clear = styled.button`
  display: grid;
  grid-auto-flow: column;
  place-content: center;
  height: 50px;
  padding: 0.5em 1.5em;
  margin-left: 0.5em;
  white-space: nowrap;
  background-color: var(--neutral30);
  border-radius: 25px;

  &:hover {
    background-color: var(--red20);
  }

  svg {
    margin-right: 4px;
  }
`;
