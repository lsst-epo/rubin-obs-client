import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation, Trans } from "react-i18next";
import { useAuthenticationContext } from "@/contexts/Authentication";
import RegisterForm from "./RegisterForm";
import useAuthModal from "@/hooks/useAuthModal";
import { Button } from "@/components/atomic";
import AuthModal from "../AuthModal";
import JoinForm from "./JoinForm";
import * as Styled from "./RegisterForm/styles";

export default function RegisterModal() {
  const { query } = useRouter();

  const { openModal, closeModal } = useAuthModal();

  const { authenticateWithGoogle, authenticateWithFacebook } =
    useAuthenticationContext();

  const { t } = useTranslation();

  const [formState, setFormState] = useState({
    role: "student",
    loading: false,
    success: false,
    error: false,
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

  /** WIP: If the query includes a code, sign in with google.
   * Google return URL should also include a role of teacher or student
   */
  useEffect(() => {
    if (query.code && !query.facebook) {
      console.info("Fetching Google token...");
      setFormState({ loading: true });

      const fetchToken = async () => {
        const data = await authenticateWithGoogle({
          code: query.code,
          role: query.role,
        });

        return data;
      };

      fetchToken()
        .then((data) => {
          setFormState({ loading: false, success: true });
          console.info(data);
        })
        .catch((e) => {
          setFormState({ loading: false, error: true });
          console.error(e);
        });
    }

    if (query.code && query.facebook) {
      console.info("Authenticating with Facebook...");
      setFormState({ loading: true });

      const authWithFB = async () => {
        const data = await authenticateWithFacebook({
          code: query.code,
          role: query.role,
        });

        return data;
      };

      authWithFB()
        .then((data) => {
          setFormState({
            loading: false,
            error: !!data.errors,
            success: data.errors === undefined,
          });
          console.info(data);
        })
        .catch((e) => {
          setFormState({ loading: false, error: true });
          console.error(e);
        });
    }
  }, [query, authenticateWithGoogle, authenticateWithFacebook, setFormState]);

  return (
    <AuthModal
      open={!!query.register}
      onClose={onClose}
      aria-label="Sign Up"
      image={formState.success ? undefined : formState.role}
    >
      {formState.loading ? (
        <>
          <AuthModal.Title>Registering...</AuthModal.Title>
        </>
      ) : formState.success ? (
        <>
          <AuthModal.Title>
            {t("register.success", { context: query.role })}
          </AuthModal.Title>
          <AuthModal.Description>
            <Trans
              i18nKey="register.success_message"
              values={{ context: query.role }}
              components={[<strong key="bold"></strong>]}
            />
          </AuthModal.Description>
          <Styled.FormButtons>
            <Button onClick={onClose}>{t("register.confirm_button")}</Button>
          </Styled.FormButtons>
        </>
      ) : formState.error ? (
        <>
          <AuthModal.Title>Error!</AuthModal.Title>
          <AuthModal.Description>
            There was an error signing you in with{" "}
            {query.scope ? "Google" : "Facebook"}.
          </AuthModal.Description>
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
