import React, { useState } from "react";
import { useRouter } from "next/router";
import RegisterForm from "./RegisterForm";
import RegisterRoleForm from "./RegisterRoleForm";
import RegisterSuccess from "./RegisterSuccess";
import useAuthModal from "@/hooks/useAuthModal";
import AuthModal from "../AuthModal";

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

  return (
    <AuthModal
      open={!!query.register}
      onClose={onClose}
      aria-label="Sign Up"
      image={formState.success ? undefined : formState.role}
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
    </AuthModal>
  );
}
