import styled from "styled-components";
import { respond } from "@/styles/globalStyles";

export const Wrapper = styled.div`
  display: contents;

  ${respond(`
    display: block;
  `)}
`;

export const Term = styled.dt`
  display: var(--Metadata-item-display);

  &::after {
    content: ": ";
  }
`;

export const Definition = styled.dd`
  display: var(--Metadata-item-display);

  > * {
    display: inherit;
  }
`;
