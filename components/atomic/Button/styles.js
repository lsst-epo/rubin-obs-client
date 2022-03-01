import styled, { css } from "styled-components";
import { protoButton, fluidScale } from "@/styles/globalStyles";

export const Button = styled.button`
  ${protoButton()}

  display: inline-flex;
  align-items: center;
  padding: 15px;
  font-size: ${fluidScale("20px", "16px")};
  font-weight: bold;
  text-decoration: none;
  border-radius: 6px;
  transition: background-color 0.2s;
  min-height: 60px;
  border: 1px solid transparent;

  ${({ $styleAs }) => {
    switch ($styleAs) {
      case "secondary":
        return css`
          background: var(--turquoise55);
          color: var(--white);
        `;

      case "tertiary":
        return css`
          border-color: var(--black);
          background: var(--white);
          color: var(--black);
        `;

      case "warning":
        return css`
          background: #cf4040;
          color: var(--white);
        `;

      default:
        return css`
          background: var(--turquoise55);
          color: var(--white);
        `;
    }
  }}

  &:hover:not(:disabled):not([data-inactive]),
  &:focus-visible {
    border-color: transparent;
    background-color: var(--turquoise80);
    color: var(--white);
  }

  &:disabled {
    background-color: var(--neutral40);
  }

  ${({ $isBlock }) =>
    $isBlock &&
    css`
      display: flex;
      width: 100%;
    `}

  &[data-inactive] {
    background: var(--neutral60);
    cursor: default;
  }
`;

export const ButtonText = styled.span`
  flex: 1 1 auto;

  svg + & {
    padding-inline-start: 10px;
  }
`;
