import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useAuthenticationContext } from "@/contexts/Authentication";
import { Button } from "@/components/atomic";
import { Error, FormField, Input, PasswordField } from "@/components/form";
import * as Styled from "./styles";
import AuthModal from "../../AuthModal";

function getErrorSource(error) {
  const isEmail =
    error?.message &&
    (error.message.toLowerCase().includes("email") ||
      error.message.toLowerCase().includes("username"));
  return isEmail ? "email" : "form";
}

export default function RegisterForm({ onCancel }) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { isDirty, isSubmitting, errors },
  } = useForm();

  const { register: registerApi, pendingGroup } = useAuthenticationContext();

  const onSubmit = async (data) => {
    if (!data.email || !data.password) return;

    const response = await registerApi(data);

    if (response.errors) {
      const invalid = response.errors.find(
        (e) => e.extensions.code === "INVALID"
      );
      const errorSource = getErrorSource(invalid);

      if (errorSource === "email") {
        setError("email", { type: "manual", message: invalid.message });
      } else {
        setError("form", {
          type: "manual",
          message: response.errors.map((e) => e.message).join(" "),
        });
      }
    }

    return response;
  };

  return (
    <>
      <AuthModal.Title>
        {t("register.header", { context: pendingGroup })}
      </AuthModal.Title>
      <AuthModal.Description>
        {t("register.instructions", { context: pendingGroup })}
      </AuthModal.Description>
      <Styled.Form onSubmit={handleSubmit(onSubmit)}>
        {errors?.form?.message && <Error>{errors.form.message}</Error>}
        <FormField
          htmlFor="registerEmail"
          label="form.email"
          error={errors?.email?.message}
          required
        >
          <Input
            id="registerEmail"
            type="email"
            autoComplete="email"
            required
            {...register("email")}
          />
        </FormField>
        <FormField htmlFor="registerFirstName" label="form.first_name" required>
          <Input
            id="registerFirstName"
            type="text"
            autoComplete="given-name"
            {...register("firstName")}
          />
        </FormField>
        <FormField htmlFor="registerLastName" label="form.last_name" required>
          <Input
            id="registerLastName"
            type="text"
            autoComplete="family-name"
            {...register("lastName")}
          />
        </FormField>
        <PasswordField {...register("password")} />
        <Styled.FormButtons>
          <Button isInactive={!isDirty} disabled={isSubmitting}>
            {isSubmitting ? t("form.submitting") : t("register.submit_button")}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            styleAs="secondary"
            disabled={isSubmitting}
          >
            {t("form.cancel")}
          </Button>
        </Styled.FormButtons>
      </Styled.Form>
    </>
  );
}

RegisterForm.propTypes = {
  onCancel: PropTypes.func,
};
