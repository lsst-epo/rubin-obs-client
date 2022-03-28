import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Input, Select, Switch, Error } from "@/components/form";
import { updateUser } from "@/lib/api/auth";
import * as Styled from "./styles";

const LOCALE_OPTIONS = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "Español",
    value: "es",
  },
];

function getErrorSource(error) {
  if (!error?.message) return "form";

  const includes = (fieldName) =>
    error.message.toLowerCase().includes(fieldName);

  if (includes("email") || includes("username")) return "email";
  if (includes("school")) return "school";
  if (includes("emailSubscription")) return "emailSubscription";
  if (includes("preferredLanguage")) return "preferredLanguage";
  return "form";
}

function ProfilePreferencesForm({ userData, maybeRefreshToken, onSuccess }) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: { errors, isDirty, isSubmitting, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      email: userData.email || "",
      school: userData.school || "",
      preferredLanguage: userData.preferredLanguage || "en",
      emailSubscription: userData.emailSubscription || [],
    },
  });
  const [emailChecked, setEmailChecked] = useState(
    userData.emailSubscription?.[0] === "subscribe"
  );
  const [submitLabel, setSubmitLabel] = useState(t("account.submit_profile"));

  useEffect(() => {
    if (!isSubmitSuccessful) return;

    reset(null, { keepValues: true });
    setSubmitLabel(t("account.submit_success"));
    setTimeout(() => setSubmitLabel(t("account.submit_profile")), 2500);
  }, [isSubmitSuccessful, reset, t]);

  useEffect(() => {
    if (isSubmitting) setSubmitLabel(t("account.submit_pending"));
  }, [isSubmitting, t]);

  async function onSubmit(data) {
    const response = await updateUser(data, maybeRefreshToken);

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

    if (response.updateViewer) onSuccess(response.updateViewer);
  }

  function onEmailSubscriptionClick() {
    const newValue = !emailChecked ? ["subscribe"] : [];

    setValue("emailSubscription", newValue);
    setEmailChecked((prev) => !prev);
  }

  return (
    <Styled.Form
      onSubmit={handleSubmit(onSubmit)}
      aria-describedby="profilePreferencesFormError"
    >
      <Styled.Section>
        <header>
          <Styled.SectionTitle>{t("account.profile")}</Styled.SectionTitle>
        </header>
        <Styled.ResponsiveField
          htmlFor="accountEmail"
          label="form.email"
          error={errors?.email?.message}
        >
          <Input id="accountEmail" {...register("email")} />
        </Styled.ResponsiveField>
        <Styled.ResponsiveField
          htmlFor="accountSchool"
          label="form.school"
          error={errors?.school?.message}
        >
          <Input id="accountSchool" {...register("school")} />
        </Styled.ResponsiveField>
      </Styled.Section>
      <Styled.Section>
        <header>
          <Styled.SectionTitle>{t("account.preferences")}</Styled.SectionTitle>
        </header>
        <Styled.Field
          htmlFor="accountPreferredLangugage"
          label="form.preferred_language"
          error={errors?.preferredLanguage?.message}
        >
          <Select
            id="accountPreferredLangugage"
            options={LOCALE_OPTIONS}
            {...register("preferredLanguage")}
          />
        </Styled.Field>
        <Styled.FlexField
          htmlFor="accountEmailSubscription"
          label="form.email_subscription"
          error={errors?.emailSubscription?.message}
        >
          <Switch
            id="accountEmailSubscription"
            checked={emailChecked}
            onClick={onEmailSubscriptionClick}
          />
        </Styled.FlexField>
      </Styled.Section>
      <Styled.Button
        type="submit"
        isInactive={!isDirty}
        disabled={isSubmitting}
      >
        {submitLabel}
      </Styled.Button>
      <Error id="profilePreferencesFormError">
        {errors?.form?.message || ""}
      </Error>
    </Styled.Form>
  );
}

ProfilePreferencesForm.displayName =
  "Template.UserProfilePage.ProfilePreferencesForm";

ProfilePreferencesForm.propTypes = {
  userData: PropTypes.object.isRequired,
  maybeRefreshToken: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default ProfilePreferencesForm;
