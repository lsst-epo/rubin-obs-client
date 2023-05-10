import styled from "styled-components";
import { Popover } from "@headlessui/react";

export const PanelInner = styled.div`
  padding: 0.5em;
  background-color: var(--white);
  border-radius: 0.5em;
  box-shadow: 5px 15px 35px 8px rgba(0, 0, 0, 0.13);
`;

export const Button = styled(Popover.Button)`
  &:hover,
  &.focus-visible,
  &:focus-visible,
  &[aria-expanded="true"] {
    svg {
      outline: 1px solid currentColor;
    }
  }
`;
