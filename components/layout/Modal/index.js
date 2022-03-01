import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import IconComposer from "@/components/svg/IconComposer";
import * as Styled from "./styles";

export default function Modal({ open, onClose, children, image }) {
  // TODO: Needs proper a11y roles and labels
  return (
    <Styled.Modal open={open}>
      <Styled.Inner>
        {image && image.src && (
          <Styled.Image>
            <Image alt={image.alt || ""} {...image} />
          </Styled.Image>
        )}
        <Styled.CloseButton type="button" aria-label="Close" onClick={onClose}>
          <IconComposer icon="close" />
        </Styled.CloseButton>
        <Styled.Content>{children}</Styled.Content>
      </Styled.Inner>
    </Styled.Modal>
  );
}

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  image: {
    src: PropTypes.string,
    alt: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  },
};
