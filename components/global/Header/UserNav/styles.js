import styled from "styled-components";
import { fluidScale, respond, tokens } from "@/styles/globalStyles";

export const Nav = styled.nav`
  height: var(--header-height);
  display: flex;
  align-items: center;
  gap: 0.85em;
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
  margin-right: 15px;
  margin-left: 15px;
  z-index: 5;
`;

export const UserButton = styled.button`
  display: flex;
  align-items: center;
`;

export const SubnavList = styled.ul`
  position: absolute;
  background-color: var(--white);
  border: 1px solid #707070;
  border-radius: 6px;
  right: 0;
  min-width: 236px;
  overflow: hidden;
  transform: translateY(-30px);
  opacity: 0;
  transition: transform 0.25s ease-in-out, opacity 0.125s ease-in;
  z-index: -1;

  &[open] {
    opacity: 1;
    transform: translateY(12px);
    z-index: 0;
  }
`;

export const SubnavItem = styled.li``;

export const SubnavLink = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${tokens.neutral90};
  padding: 13px;
  width: 100%;
  text-align: left;
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
  background-color: var(--turquoise55);
  border-radius: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--turquoise80);
  }
`;
