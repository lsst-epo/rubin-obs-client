import styled from "styled-components";
import { respond, BREAK_DESKTOP_SMALL } from "theme/styles/globalStyles";

export const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  background-color: var(--neutral60);
  border-radius: 50%;
  z-index: 1;
  transition: color 0.2s, background-color 0.2s;

  &:hover {
    background-color: var(--neutral40);
  }

  &.focus-visible {
    outline-color: var(--Carousel-Button-outline-color);
  }

  &[aria-disabled="true"] {
    pointer-events: none;
    color: var(--neutral40);
    background-color: var(--neutral80);
  }

  ${respond(`display: none;`, BREAK_DESKTOP_SMALL)}
`;
