import { useRef } from "react";
import PropTypes from "prop-types";
import IconComposer from "@/components/svg/IconComposer";
import * as Styled from "./styles";
import { useFocusTrap, useKeyDownEvent, useLockBodyScroll } from "@/hooks";

export default function Modal({ open, onClose, children, ...ModalProps }) {
  const ref = useRef(null);

  useFocusTrap(ref, open);

  useLockBodyScroll(open);

  useKeyDownEvent(handleKeyDown);

  function handleKeyDown({ key }) {
    if (!open || key !== "Escape") return;
    onClose();
  }

  return (
    <Styled.Modal hidden={!open} ref={ref}>
      <Styled.Inner role="dialog" aria-live="polite" {...ModalProps}>
        <Styled.CloseButton type="button" aria-label="Close" onClick={onClose}>
          <IconComposer icon="close" />
        </Styled.CloseButton>
        {children}
      </Styled.Inner>
    </Styled.Modal>
  );
}

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  /** An aria label is required for dialogs */
  "aria-label": PropTypes.string.isRequired,
};
