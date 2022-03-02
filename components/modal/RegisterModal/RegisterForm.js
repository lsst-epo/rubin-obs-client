import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useAuthenticationContext } from "@/contexts/Authentication";
import { Button } from "@/components/atomic";
import { Error, FormField, Input } from "@/components/form";
import * as Styled from "./styles";

export default function RegisterForm({ role, onSuccess, onCancel }) {
  const { push } = useRouter();

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { isDirty, isSubmitting, errors },
  } = useForm();

  const { register: registerApi } = useAuthenticationContext();

  const onSubmit = async (data) => {
    if (!data.email || !data.password) return;

    const response = await registerApi({ ...data, role });

    if (response?.jwt) {
      onSuccess();
    } else if (response?.errors) {
      const invalid = response.errors.find(
        (e) => e.extensions.code === "INVALID"
      );

      // TOOD: There's got to be a better way to check field errors...
      if (invalid?.message && invalid.message.toLowerCase().includes("email")) {
        setError("email", { type: "manual", message: invalid.message });
      } else {
        setError("form", {
          type: "manual",
          message: response.errors.map((e) => e.message),
        });
      }
    }

    return response;
  };

  return (
    <>
      <h2>{t("auth.register_header", { context: role })}</h2>
      <p>{t("auth.register_instructions", { context: role })}</p>
      <Styled.Form onSubmit={handleSubmit(onSubmit)}>
        {errors?.form?.message && <Error>{errors.form.message}</Error>}
        <FormField
          htmlFor="studentEmail"
          label="form.email"
          error={errors?.email?.message}
          required
        >
          <Input
            id="studentEmail"
            type="email"
            required
            {...register("email")}
          />
        </FormField>
        <FormField htmlFor="studentName" label="form.your_name" required>
          <Input id="studentName" type="text" {...register("fullName")} />
        </FormField>
        <FormField
          htmlFor="studentPassword"
          label="form.create_password"
          description={t("form.create_password_instructions")}
        >
          <Input
            id="studentPassword"
            type="password"
            pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
            required
            {...register("password")}
          />
        </FormField>
        <Styled.FormButtons>
          <Button isInactive={!isDirty} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : t("form.sign_up")}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            styleAs="warning"
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
  role: PropTypes.oneOf(["student", "teacher"]),
};
