import React, { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation, Trans } from "react-i18next";
import RegisterForm from "./RegisterForm";
import useAuthModal from "@/hooks/useAuthModal";
import { Button } from "@/components/atomic";
import AuthModal from "../AuthModal";
import JoinForm from "./JoinForm";
import * as Styled from "./RegisterForm/styles";

export default function RegisterModal() {
  const { query } = useRouter();

  const { openModal, closeModal } = useAuthModal();

  const { t } = useTranslation();

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
        <>
          <h2>{t("register.success", { context: query.role })}</h2>
          <p>
            <Trans
              i18nKey="register.success_message"
              values={{ context: query.role }}
              components={[<strong key="bold"></strong>]}
            />
          </p>
          <Styled.FormButtons>
            <Button onClick={onClose}>{t("register.confirm_button")}</Button>
          </Styled.FormButtons>
        </>
      ) : query.role === "teacher" || query.role === "student" ? (
        <RegisterForm
          role={query.role}
          onSuccess={onSuccess}
          onCancel={onCancel}
        />
      ) : (
        <JoinForm
          onEmailSignup={onEmailSignup}
          onRoleChange={(role) => setFormState({ role: role })}
          role={formState.role}
        />
      )}
    </AuthModal>
  );
}
