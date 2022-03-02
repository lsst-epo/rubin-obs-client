import styled from "styled-components";
import NextLink from "next/link";
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

export const UserToggle = styled(NextLink)`
  margin-right: 15px;
  margin-left: 15px;
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
