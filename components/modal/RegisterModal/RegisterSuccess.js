import PropTypes from "prop-types";
import { Button } from "@/components/atomic";
import * as Styled from "./styles";

export default function RegisterSuccess({ role, onClose }) {
  return role === "teacher" ? (
    <>
      <h2>Approval pending</h2>
      <p>
        Your account is now created, but approval is pending. You’ll receive an
        email notification once it is approved and ready to enjoy access to real
        astronomy data and tools. <strong>Free of charge forever.</strong>
      </p>
      <Styled.FormButtons>
        <Button onClick={onClose}>Got it!</Button>
      </Styled.FormButtons>
    </>
  ) : (
    <>
      <h2>Success!</h2>
      <p>
        Your account has been successfully created! Enjoy access to real
        astronomy data and tools. <strong>Free of charge forever.</strong>
      </p>
      <Styled.FormButtons>
        <Button onClick={onClose}>Got it!</Button>
      </Styled.FormButtons>
    </>
  );
}

RegisterSuccess.propTypes = {
  role: PropTypes.oneOf(["student", "teacher"]),
};
