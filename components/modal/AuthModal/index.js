import PropTypes from "prop-types";
import Image from "next/image";
import Modal from "@/components/layout/Modal";
import * as Styled from "./styles";

export default function AuthModal({ children, header, image, ...modalProps }) {
  const imageProps =
    image === "student"
      ? {
          src: "/images/sign_up_student.png",
          width: 231.21,
          height: 247.22,
        }
      : image === "teacher"
      ? {
          src: "/images/sign_up_teacher.png",
          width: 201,
          height: 232,
        }
      : null;

  return (
    <Modal {...modalProps}>
      <Styled.Inner>
        {imageProps && (
          <Styled.ImageWrapper $image={image} role="presentation">
            <Image {...imageProps} />
          </Styled.ImageWrapper>
        )}
        <Styled.Content>{children}</Styled.Content>
      </Styled.Inner>
    </Modal>
  );
}

AuthModal.propTypes = {
  /** Modal header text */
  header: PropTypes.string,
  /** Image shown to the left of the modal */
  image: PropTypes.oneOf(["student", "teacher"]),
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  /** An aria label is required for dialogs */
  "aria-label": PropTypes.string.isRequired,
};
