import styled from "styled-components";
import { zStack } from "@/styles/globalStyles";
import { Dialog as BaseDialog } from "@headlessui/react";
import IconButton from "@/components/atomic/Button/IconButton";

export const Overlay = styled(BaseDialog.Overlay)`
  background-color: rgba(0, 0, 0, 80%);
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
`;

export const Dialog = styled(BaseDialog)`
  position: fixed;
  inset: 0;
  z-index: ${zStack.dialog};
  overflow: auto;
  padding: 1rem;
  display: flex;
  align-items: start;
  justify-content: center;
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--PADDING_SMALL, 20px);
  max-width: 100vw;
  color: var(--white, #fff);
  width: calc(100vw - 1rem);
  max-width: var(--BREAK_LARGE_TABLET, 850px);
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
`;

export const CloseButton = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
  width: 1rem;
  height: 1rem;

  &:hover {
    svg {
      stroke-width: 10px;
    }
  }
`;
