import { useAuthenticationContext } from "@/contexts/Authentication";
import { useTranslation } from "react-i18next";

export default function SRAnnouncement() {
  const { isAuthenticated, user } = useAuthenticationContext();
  const { t } = useTranslation();

  return (
    <div role="status" className="a-hidden">
      {isAuthenticated
        ? t("auth.logged_in_as", { name: user.fullName })
        : t("auth.logged_out")}
    </div>
  );
}
