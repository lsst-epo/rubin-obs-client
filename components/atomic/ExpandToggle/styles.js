import styled from "styled-components";

export const Button = styled.button`
  color: var(--turquoise85);
  transition: color 0.2s;

  &:hover {
    color: var(--turquoise85);
  }

  &[aria-hidden="true"] {
    display: none;
  }
`;
