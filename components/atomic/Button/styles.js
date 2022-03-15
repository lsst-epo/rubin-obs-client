import styled, { css } from "styled-components";
import { fluidScale } from "@/styles/globalStyles";
import { aButton } from "@/styles/mixins/appearance";

export const Button = styled.button`
  ${({ $styleAs }) => aButton($styleAs)}
  align-items: center;
  font-size: ${fluidScale("20px", "16px")};

  ${({ $isBlock }) =>
    $isBlock &&
    css`
      display: flex;
      width: 100%;
    `}

  ${({ $hasIcon }) =>
    $hasIcon &&
    css`
      display: inline-flex;
      padding-inline-start: 15px;
    `}
`;

export const ButtonText = styled.span`
  flex: 1 1 auto;
  text-align: center;

  svg + & {
    padding-inline-start: 10px;
  }
`;
