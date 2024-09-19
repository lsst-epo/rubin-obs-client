import PropTypes from "prop-types";
import { useGoogleLogin } from "@react-oauth/google";
import { usePathname, useRouter } from "next/navigation";
import { useAuthenticationContext } from "@/contexts/Authentication";
import SSOButton from "./SSOButton";
import useQueryParams from "@/lib/routing/useQueryParams";

export default function GoogleSSOButton({ children, ...buttonProps }) {
  const { authenticateWithGoogle } = useAuthenticationContext();
  const { replace } = useRouter();
  const { queryParams } = useQueryParams();
  const pathName = usePathname();
  const params = new URLSearchParams({ sso: true });

  const goToGoogleSignIn = useGoogleLogin({
    state: `${pathName}?${queryParams.toString()}`,
    onSuccess: (response) => {
      replace(`${pathName}?${params.toString()}`, {
        scroll: true,
      });
      fetch("/api/charming-overlords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: response.code }),
      })
        .then((res) => res.json())
        .then((data) => {
          authenticateWithGoogle(data);
        })
        .catch(console.error);
    },
    onError: (error) => {
      console.error(error);
    },
    flow: "auth-code",
  });

  return (
    <SSOButton
      {...buttonProps}
      service="google"
      type="button"
      onClick={goToGoogleSignIn}
    >
      {children}
    </SSOButton>
  );
}

GoogleSSOButton.propTypes = {
  children: PropTypes.node,
  service: PropTypes.oneOf(["google", "facebook", "email"]),
};
