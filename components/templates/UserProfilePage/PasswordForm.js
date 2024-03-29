import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Password, Error } from "@rubin-epo/epo-react-lib";
import { updatePassword } from "@/lib/api/auth";
import * as Styled from "./styles";

function getErrorSource(error) {
  if (!error?.message) return "form";

  const includes = (fieldName) =>
    error.message.toLowerCase().includes(fieldName);

  if (includes("currentPassword")) return "currentPassword";
  if (includes("newPassword")) return "newPassword";
  if (includes("confirmPassword")) return "confirmPassword";
  return "form";
}

function PasswordForm({ maybeRefreshToken }) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: {
      errors,
      isDirty,
      submitCount,
      isSubmitting,
      isSubmitSuccessful,
    },
  } = useForm();
  const [submitLabel, setSubmitLabel] = useState(t("account.submit_password"));

  useEffect(() => {
    if (!isSubmitSuccessful) return;

    reset();
    setSubmitLabel(t("account.submit_success"));
    setTimeout(() => setSubmitLabel(t("account.submit_password")), 2500);
  }, [isSubmitSuccessful]); // eslint-disable-line react-hooks/exhaustive-deps

  // runs on a failed form submission
  useEffect(() => {
    if (isSubmitSuccessful || submitCount < 1) return;

    reset(null, { keepErrors: true, keepValues: true, keepSubmitCount: true });
    setSubmitLabel(t("account.submit_password"));
  }, [isSubmitSuccessful, submitCount]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isSubmitting) setSubmitLabel(t("account.submit_pending"));
  }, [isSubmitting]); // eslint-disable-line react-hooks/exhaustive-deps

  // clear form errors when fields are modified after failed form submission
  useEffect(() => {
    if (submitCount >= 1 && isDirty) clearErrors();
  }, [isDirty]); // eslint-disable-line react-hooks/exhaustive-deps

  async function onSubmit(data) {
    const response = await updatePassword({
      ...data,
      tokenFetcher: maybeRefreshToken,
    });

    if (response.errors) {
      const invalid = response.errors.find(
        (e) => e.extensions.code === "INVALID"
      );
      const errorSource = getErrorSource(invalid);

      setError(errorSource, {
        type: "manual",
        message:
          errorSource === "form"
            ? response.errors.map((e) => e.message).join(" ")
            : invalid.message,
      });
    }

    return response;
  }

  return (
    <Styled.Form
      onSubmit={handleSubmit(onSubmit)}
      aria-describedby="passwordFormError"
    >
      <Styled.Section>
        <header>
          <Styled.SectionTitle>{t("account.password")}</Styled.SectionTitle>
        </header>
        <Styled.ResponsiveField
          htmlFor="accountCurrentPassword"
          label="form.current_password"
          error={errors?.currentPassword?.message}
        >
          <Password
            id="accountCurrentPassword"
            autoComplete="current-password"
            required
            {...register("currentPassword")}
          />
        </Styled.ResponsiveField>
        <Styled.ResponsiveField
          htmlFor="accountNewPassword"
          label="form.new_password"
          error={errors?.newPassword?.message}
        >
          <Password
            id="accountNewPassword"
            autoComplete="new-password"
            required
            {...register("newPassword")}
          />
        </Styled.ResponsiveField>
        <Styled.ResponsiveField
          htmlFor="accountConfirmPassword"
          label="form.confirm_password"
          error={errors?.confirmPassword?.message}
        >
          <Password
            id="accountConfirmPassword"
            autoComplete="new-password"
            required
            {...register("confirmPassword")}
          />
        </Styled.ResponsiveField>
      </Styled.Section>
      <Styled.Button
        type="submit"
        isInactive={!isDirty}
        disabled={isSubmitting}
      >
        {submitLabel}
      </Styled.Button>
      <Error id="passwordFormError">{errors?.form?.message || ""}</Error>
    </Styled.Form>
  );
}

PasswordForm.displayName = "Template.UserProfilePage.PasswordForm";

PasswordForm.propTypes = {
  maybeRefreshToken: PropTypes.func.isRequired,
};

export default PasswordForm;
