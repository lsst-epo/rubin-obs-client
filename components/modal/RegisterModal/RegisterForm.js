import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useAuthentication from "@/hooks/useAuthentication";
import { Button } from "@/components/atomic";
import { FormField, Input } from "@/components/form";
import * as Styled from "./styles";

export default function RegisterForm({ role, onSuccess, onCancel }) {
  const { push } = useRouter();

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm();

  const { register: registerApi } = useAuthentication();

  const onSubmit = async (data) => {
    if (!data.email || !data.password) return;

    const response = await registerApi({ ...data, role });

    if (response?.jwt) {
      onSuccess();
    }
  };

  return (
    <>
      <h2>{t("auth.register_header", { context: role })}</h2>
      <p>{t("auth.register_instructions", { context: role })}</p>
      <Styled.Form onSubmit={handleSubmit(onSubmit)}>
        <FormField htmlFor="studentEmail" label="form.email" required>
          <Input
            id="studentEmail"
            type="email"
            required
            {...register("email", { required: true })}
          />
        </FormField>
        <FormField htmlFor="studentName" label="form.name" required>
          <Input
            id="studentName"
            type="text"
            required
            {...register("fullName", { required: true })}
          />
        </FormField>
        <FormField
          htmlFor="studentPassword"
          label="form.create_password"
          description={t("form.create_password_instructions")}
        >
          <Input
            id="studentPassword"
            type="password"
            required
            {...register("password", { required: true })}
          />
        </FormField>
        <Styled.FormButtons>
          <Button isInactive={!isDirty}>{t("form.sign_up")}</Button>
          <Button type="button" onClick={onCancel} styleAs="warning">
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
