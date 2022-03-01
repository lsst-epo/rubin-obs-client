import { useRef } from "react";
import PropTypes from "prop-types";
import IconComposer from "@/components/svg/IconComposer";
import * as Styled from "./styles";
import useFocusTrap from "@/hooks/useFocusTrap";
import { useKeyDownEvent } from "@/hooks/listeners";

export default function Modal({
  open,
  onClose,
  children,
  maxWidth,
  ...modalProps
}) {
  const ref = useRef(null);

  useFocusTrap(ref, open);

  useKeyDownEvent(handleKeyDown);

  function handleKeyDown({ key }) {
    if (!open || key !== "Escape") return;
    onClose();
  }

  return (
    <Styled.Modal hidden={!open} ref={ref}>
      <Styled.Inner role="dialog" {...modalProps}>
        <Styled.CloseButton type="button" aria-label="Close" onClick={onClose}>
          <IconComposer icon="close" />
        </Styled.CloseButton>
        <Styled.Content $maxWidth={maxWidth}>{children}</Styled.Content>
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
  /** maxWidth string - can be px, ems, vw, etc */
  maxWidth: PropTypes.string,
  disclosureRef: PropTypes.ref,
};
