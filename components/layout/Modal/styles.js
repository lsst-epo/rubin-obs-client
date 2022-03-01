import styled, { css } from "styled-components";
import {
  fluidScale,
  respond,
  zStack,
  BREAK_PHABLET,
} from "@/styles/globalStyles";

export const Modal = styled.div`
  position: fixed;
  display: none;

  &[open] {
    display: flex;
    align-items: start;
    justify-content: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    max-height: 100vh;
    overflow-y: auto;
    z-index: ${zStack.dialogBackdrop};
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

export const Inner = styled.div`
  position: relative;
  display: flex;
  background: var(--white);
  color: var(--neutral80);
  max-width: 827px;
  margin-block-start: ${fluidScale("150px", "15px")};
  margin-block-end: ${fluidScale("150px", "15px")};
  margin-inline-start: 15px;
  margin-inline-end: 15px;

  ${respond(
    css`
      width: 100vw;
    `,
    BREAK_PHABLET
  )}
`;

export const Image = styled.div``;

export const Content = styled.div`
  padding: ${fluidScale("60px", "15px")};
  padding-block-start: ${fluidScale("60px", "76px")};
`;

export const CloseButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: ${fluidScale("10px", "15px")};
  top: ${fluidScale("10px", "15px")};
  width: 42px;
  height: 42px;
  border-radius: 100%;
  background: var(--neutral10);
`;
