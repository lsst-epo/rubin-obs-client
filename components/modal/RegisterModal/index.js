import React, { useState } from "react";
import { useRouter } from "next/router";
import Modal from "@/components/modal/Modal";
import RegisterForm from "./RegisterForm";
import RegisterRoleForm from "./RegisterRoleForm";
import RegisterSuccess from "./RegisterSuccess";
import useAuthModal from "@/hooks/useAuthModal";

export default function RegisterModal() {
  const { query } = useRouter();

  const { openModal, closeModal } = useAuthModal();

  const [formState, setFormState] = useState({
    role: "student",
    success: false,
  });

  const onClose = () => {
    closeModal();
  };

  const onCancel = () => {
    openModal("register");
  };

  const onEmailSignup = () => {
    openModal("register", { role: formState.role });
  };

  const onSuccess = () => {
    setFormState({ ...formState, success: true });
  };

  // TODO: Needs proper a11y roles and labels
  // Make sure modal is announced when user moves between sign in / forgot password / etc.
  return (
    <Modal
      open={!!query.register}
      onClose={onClose}
      maxWidth="550px"
      aria-live="polite"
      aria-label="Sign Up"
    >
      {formState.success ? (
        <RegisterSuccess role={query.role} onClose={onClose} />
      ) : query.role === "teacher" || query.role === "student" ? (
        <RegisterForm
          role={query.role}
          onSuccess={onSuccess}
          onCancel={onCancel}
        />
      ) : (
        <RegisterRoleForm
          role={formState.role}
          onRoleChange={(selectedRole) => setFormState({ role: selectedRole })}
          onEmailSignup={onEmailSignup}
        />
      )}
    </Modal>
  );
}
