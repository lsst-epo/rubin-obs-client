"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuthenticationContext } from "@/contexts/Authentication";
import useAuthModal from "@/hooks/useAuthModal";
import { Button } from "@rubin-epo/epo-react-lib";
import AuthModal from "../AuthModal";
import * as Styled from "./styles";
import useQueryParams from "@/lib/routing/useQueryParams";

export default function ActivateModal() {
  const { closeModal } = useAuthModal();
  const { queryParams } = useQueryParams();

  const activate = queryParams.get("activate");
  const code = queryParams.get("code");
  const id = queryParams.get("id");
  const educator = queryParams.get("educator");

  const { t } = useTranslation();

  const { activateUser } = useAuthenticationContext();

  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrored, setIsErrored] = useState(false);

  // init API request as soon as modal opens
  useEffect(() => {
    async function doActivation() {
      if (isLoading) return;

      setIsLoading(true);
      const response = await activateUser({ code, id });

      if (response) {
        setIsLoading(false);

        if (response.errors) {
          setIsErrored(true);
          setIsSuccessful(false);
        } else {
          setIsErrored(false);
          setIsSuccessful(true);
        }
      }
    }

    if (!activate || activate !== "true") return;

    doActivation().catch((error) => {
      console.error(error);
      setIsErrored(true);
      setIsSuccessful(false);
      setIsLoading(false);
    });

    return () => {
      setIsSuccessful(false);
      setIsLoading(false);
      setIsErrored(false);
    };
  }, [activate]); // eslint-disable-line react-hooks/exhaustive-deps

  const onClose = () => {
    closeModal();
  };

  return (
    <AuthModal
      open={activate === "true"}
      onClose={onClose}
      aria-label={t("activate.header")}
    >
      {isSuccessful && (
        <>
          <AuthModal.Title>{t("activate.success")}</AuthModal.Title>
          <AuthModal.Description>
            {educator === "true"
              ? t("activate.success_message_educator")
              : t("activate.success_message")}
          </AuthModal.Description>
          <Styled.FormButtons>
            <Button onClick={onClose}>{t("activate.confirm_button")}</Button>
          </Styled.FormButtons>
        </>
      )}
      {isErrored && (
        <>
          <AuthModal.Title>{t("activate.error")}</AuthModal.Title>
          <AuthModal.Description>
            {t("activate.error_message")}
          </AuthModal.Description>
          <Styled.FormButtons>
            <Button onClick={onClose}>{t("activate.confirm_button")}</Button>
          </Styled.FormButtons>
        </>
      )}
      {isLoading && (
        <>
          <AuthModal.Title>{t("activate.loading")}</AuthModal.Title>
        </>
      )}
    </AuthModal>
  );
}
