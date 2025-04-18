import styled from "styled-components";
import { zStack } from "@/styles/globalStyles";
import { Dialog as BaseDialog, DialogBackdrop } from "@headlessui/react";
import IconButton from "@/components/atomic/Button/IconButton";

export const Overlay = styled(DialogBackdrop)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 80%);
`;

export const Dialog = styled(BaseDialog)`
  position: fixed;
  inset: 0;
  z-index: ${zStack.dialog};
  display: flex;
  align-items: start;
  justify-content: center;
  padding: 1rem;
  overflow: auto;
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--PADDING_SMALL, 20px);
  width: calc(100vw - 1rem);
  max-width: var(--BREAK_LARGE_TABLET, 850px);
  max-height: 100%;
  color: var(--white, #fff);
`;

export const ScrollableContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--PADDING_SMALL, 20px);
  overflow: hidden auto;
  scrollbar-color: var(--white, #fff) rgba(255, 255, 255, 20%);
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 8px;
    background-color: rgba(255, 255, 255, 50%); /* or add it to the track */
    background-clip: padding-box;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--white, #fff);
    border-radius: 4px;
  }
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: min-content;
`;

export const CloseButton = styled(IconButton)`
  width: 1rem;
  height: 1rem;

  &:hover {
    svg {
      stroke-width: 10px;
    }
  }
`;
