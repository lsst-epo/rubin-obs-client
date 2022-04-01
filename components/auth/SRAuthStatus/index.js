import { useAuthenticationContext } from "@/contexts/Authentication";
import { useTranslation } from "react-i18next";
import { useIsMounted } from "@/hooks";

export default function SRAnnouncement() {
  const { isAuthenticated, user } = useAuthenticationContext();
  const { t } = useTranslation();
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <div role="status" className="a-hidden">
      {isAuthenticated
        ? t("auth.logged_in_as", { name: user.fullName })
        : t("auth.logged_out")}
    </div>
  );
}
