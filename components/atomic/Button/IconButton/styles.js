import { protoButton } from "@/styles/mixins/appearance";
import styled, { css } from "styled-components";

export const IconButton = styled.button`
  ${protoButton()}
  display: flex;
  align-items: center;

  ${({ $isBlock }) =>
    $isBlock
      ? css`
          justify-content: space-between;
          width: 100%;
        `
      : css`
          gap: 1ch;
          justify-content: center;
        `}
`;
