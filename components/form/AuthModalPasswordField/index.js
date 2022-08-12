import { useTranslation } from "react-i18next";
import { Password, FormField } from "@/components/form";
import { forwardRef } from "react";

const PATTERN = [
  "^(?=(.*[A-Za-z]){1,})(?=(.*[0-9]){1,})(?=(.*[!",
  `"`,
  "#$%&'()*+,-.",
  `\\`,
  "/:;<+>?@",
  `\\`,
  "[",
  `\\`,
  "]",
  `\\`,
  `\\`,
  "^_`{}|~-]){1,}).{8,}$",
].join("");

function PasswordField(props, ref) {
  const { t } = useTranslation();
  return (
    <FormField
      htmlFor="createPassword"
      label="form.create_password"
      description={t("form.create_password_instructions")}
    >
      <Password
        ref={ref}
        id="createPassword"
        pattern={PATTERN}
        autoComplete="new-password"
        required
        {...props}
      />
    </FormField>
  );
}

export default forwardRef(PasswordField);
