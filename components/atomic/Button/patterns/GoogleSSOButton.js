import PropTypes from "prop-types";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
import { useAuthenticationContext } from "@/contexts/Authentication";
import SSOButton from "./SSOButton";

export default function GoogleSSOButton({ children, ...buttonProps }) {
  const { authenticateWithGoogle } = useAuthenticationContext();
  const { query, push, asPath, pathname } = useRouter();
  const goToGoogleSignIn = useGoogleLogin({
    state: asPath,
    onSuccess: (response) => {
      push(
        { pathname: asPath.split("?")[0], query: { sso: true } },
        undefined,
        {
          shallow: true,
        }
      );
      fetch("/api/authGoogle", {
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
