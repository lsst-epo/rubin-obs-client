import React from "react";
import PropTypes from "prop-types";
import * as Styled from "./styles";

export default function Modal({ open, onClose, children }) {
  // TODO: Needs proper a11y roles and labels
  return (
    <Styled.Modal open={open}>
      <Styled.Inner>
        <Styled.CloseButton type="button" aria-label="Close" onClick={onClose}>
          x
        </Styled.CloseButton>
        {children}
      </Styled.Inner>
    </Styled.Modal>
  );
}

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
};
