import { useTranslation } from "react-i18next";
import { Password, FormField } from "@/components/form";

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

export default function PasswordField(props) {
  const { t } = useTranslation();
  return (
    <FormField
      htmlFor="createPassword"
      label="form.create_password"
      description={t("form.create_password_instructions")}
    >
      <Password
        id="createPassword"
        pattern={PATTERN}
        autoComplete="new-password"
        required
        {...props}
      />
    </FormField>
  );
}
