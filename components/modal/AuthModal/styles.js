import styled, { css } from "styled-components";
import {
  BREAK_PHABLET,
  fluidScale,
  respond,
  zStack,
} from "@/styles/globalStyles";
import { Dialog as BaseDialog } from "@headlessui/react";

export const Overlay = styled(BaseDialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Dialog = styled(BaseDialog)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${zStack.dialog};
  overflow: auto;
  padding: 1rem;
  display: flex;
  align-items: start;
  justify-content: center;
`;

export const Title = styled(BaseDialog.Title)``;

export const Description = styled(BaseDialog.Description)`
  line-height: 1.5;
`;

export const Inner = styled.div`
  position: relative;
  display: flex;
  background: var(--white);
`;

export const Content = styled.div`
  flex: 1 1 auto;
  padding: ${fluidScale("60px", "15px")};
  padding-block-start: 60px;
  width: calc(100vw - 30px);
  max-width: 550px;
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

export const ImageWrapper = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: start;
  width: ${fluidScale("277px", "200px")};
  transition: background 1s ease-in, padding 1s ease-in;

  ${({ $image }) =>
    $image === "teacher"
      ? css`
          background: var(--orange10);
          justify-content: center;
          padding-block-start: 134px;
          padding-inline-start: 20px;
          padding-inline-end: 20px;
        `
      : css`
          background: var(--turquoise10);
          padding-block-start: 90px;
          padding-inline-start: 6px;
          padding-inline-end: 20px;
        `};

  ${respond(`display: none;`, BREAK_PHABLET)}
`;
