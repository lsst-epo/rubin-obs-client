import React from "react";
import PropTypes from "prop-types";
import IconComposer from "@/components/svg/IconComposer";
import * as Styled from "./styles";

export default function Modal({
  open,
  onClose,
  children,
  maxWidth,
  ...modalProps
}) {
  // TODO: Needs proper a11y roles and labels
  return (
    <Styled.Modal open={open} {...modalProps}>
      <Styled.Inner>
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
  onClose: PropTypes.func,
  children: PropTypes.node,
  /** maxWidth string - can be px, ems, vw, etc */
  maxWidth: PropTypes.string,
};
