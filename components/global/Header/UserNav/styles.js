import styled from "styled-components";
import { fluidScale, respond, tokens } from "@/styles/globalStyles";

export const Nav = styled.nav`
  display: flex;
  gap: 0.85em;
  align-items: center;
  height: var(--header-height);
  font-size: ${fluidScale(
    "20px",
    "18px",
    tokens.BREAK_TABLET,
    tokens.BREAK_MOBILE
  )};
  font-weight: 700;

  ${respond(
    `
      gap: 1.25em;
    `,
    tokens.BREAK_HEADER_LAYOUT
  )}
`;

export const Toggle = styled.button`
  display: flex;
  align-items: center;
`;

export const DropdownWrapper = styled.div`
  position: relative;
  z-index: 5;
  margin-inline-start: 15px;
  margin-inline-end: 15px;
`;

export const UserButton = styled.button`
  display: flex;
  align-items: center;
  border-radius: 100%;
  transition: background-color 0.2s ease-in;

  &:hover {
    background-color: ${tokens.turquoise85};
  }
`;

export const SubnavList = styled.ul`
  --UserNav-subnav-margin-top: ${fluidScale("16px", "6px")};

  position: fixed;
  top: var(--UserNav-button-top);
  right: var(--UserNav-button-right);
  z-index: -1;
  min-width: 236px;
  margin-block-start: calc(var(--UserNav-subnav-margin-top) * -1);
  overflow: hidden;
  background-color: var(--white);
  border: 1px solid #707070;
  border-radius: 6px;
  opacity: 0;
  transition: transform 0.25s ease-in-out, opacity 0.125s ease-in;
  transform: translateY(-30px);

  .invisible & {
    display: none;
  }

  &[open] {
    z-index: 1000;
    opacity: 1;
    transform: translateY(0);
  }
`;

export const SubnavItem = styled.li``;

export const SubnavLink = styled.a`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 13px;
  color: ${tokens.neutral90};
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s, background-color 0.2s;

  &:hover {
    color: var(--white);
    background-color: ${tokens.turquoise85};
  }

  &:not(:hover) svg {
    color: ${tokens.turquoise85};
  }

  svg {
    margin-inline-end: 13px;
  }
`;

export const RegisterToggle = styled(Toggle)`
  padding: 0.5em 0.85em;
  background-color: var(--turquoise85);
  border-radius: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--turquoise80);
  }
`;
