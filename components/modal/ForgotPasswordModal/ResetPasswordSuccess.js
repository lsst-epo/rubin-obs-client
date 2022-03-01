import PropTypes from "prop-types";
import { Button } from "@/components/atomic";
import * as Styled from "./styles";

export default function ResetPasswordSuccess({ onClose, email }) {
  return (
    <>
      <h2>Success!</h2>
      <p>
        We’ve sent you a link to <strong>{email}</strong> with instructions to
        reset your password
      </p>
      <Styled.FormButtons>
        <Button onClick={onClose}>Got it!</Button>
      </Styled.FormButtons>
    </>
  );
}

ResetPasswordSuccess.propTypes = {
  onClose: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};
