import styled, { css } from "styled-components";
import {
  BREAK_PHABLET,
  fluidScale,
  respond,
  zStack,
} from "@/styles/globalStyles";
import { Dialog as BaseDialog } from "@headlessui/react";
import { FormButtons as BaseFormButtons } from "@rubin-epo/epo-react-lib";

export const Overlay = styled(BaseDialog.Overlay)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 70%);
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

export const Description = styled(BaseDialog.Description)`
  font-size: 0.909em;
  line-height: 1.5;

  &:not(:first-child) {
    margin-block-start: 1.4em;
  }
`;

export const Inner = styled.div`
  position: relative;
  display: flex;
  max-width: 100vw;
  background: var(--white);

  ${({ $darkMode }) =>
    $darkMode &&
    `
      color: #fff;
      background-color: #161818;
    `}
`;

export const Content = styled.div`
  flex: 1 1 auto;
  width: calc(100vw - 30px);
  max-width: 550px;
  padding: ${fluidScale("60px", "15px")};
  padding-block-start: 60px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: ${fluidScale("10px", "15px")};
  right: ${fluidScale("10px", "15px")};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  background: var(--neutral10);
  border-radius: 100%;
`;

export const ImageWrapper = styled.div`
  display: flex;
  flex: 0 0 auto;
  align-items: start;
  width: ${fluidScale("277px", "200px")};

  ${({ $image }) =>
    $image === "educators"
      ? css`
          justify-content: center;
          padding-block-start: 134px;
          padding-inline: 20px;
          background: var(--orange20);
        `
      : css`
          padding-block-start: 90px;
          padding-inline: 6px 20px;
          background: var(--turquoise10);
        `};

  ${respond(`display: none;`, BREAK_PHABLET)}
`;

export const FormButtons = styled(BaseFormButtons)`
  margin-block-start: 44px;
`;
