import PropTypes from "prop-types";
import Image from "next/legacy/image";
import { IconComposer } from "@rubin-epo/epo-react-lib";
import { DialogTitle } from "@headlessui/react";
import * as Styled from "./styles";

export default function AuthModal({
  children,
  image,
  open = false,
  onClose,
  darkMode = false,
}) {
  const imageProps =
    image === "students"
      ? {
          src: "/images/sign_up_student.png",
          width: 231.21,
          height: 247.22,
        }
      : image === "educators"
      ? {
          src: "/images/sign_up_teacher.png",
          width: 201,
          height: 232,
        }
      : null;

  return (
    <Styled.Dialog open={open} onClose={() => onClose()}>
      <Styled.Overlay />
      <Styled.Inner $darkMode={darkMode}>
        <Styled.CloseButton type="button" aria-label="Close" onClick={onClose}>
          <IconComposer icon="close" />
        </Styled.CloseButton>
        {imageProps && (
          <Styled.ImageWrapper $image={image} role="presentation">
            <Image role="presentation" alt="" {...imageProps} />
          </Styled.ImageWrapper>
        )}
        <Styled.Content aria-live="polite">{children}</Styled.Content>
      </Styled.Inner>
    </Styled.Dialog>
  );
}

AuthModal.Title = DialogTitle;

AuthModal.Description = Styled.Description;

AuthModal.propTypes = {
  /** Image shown to the left of the modal */
  image: PropTypes.oneOf(["students", "educators"]),
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  darkMode: PropTypes.bool,
};
