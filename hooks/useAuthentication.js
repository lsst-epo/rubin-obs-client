import { useState } from "react";
import { authenticate, registerTeacher, registerStudent } from "@/lib/api/auth";

export default function useAuthentication() {
  const [authToken, setAuthToken] = useState(null);

  async function signIn({ email, password }) {
    const data = await authenticate({ email, password });

    if (data?.authenticate?.jwt) {
      setAuthToken(data.authenticate.jwt);
    }
  }

  function signOut() {
    setAuthToken(null);
  }

  async function register({ email, password, fullName, role }) {
    const registerMethod =
      role === "teacher" ? registerTeacher : registerStudent;
    const data = await registerMethod({ email, password, fullName });

    if (data?.authenticate?.jwt) {
      setAuthToken(data.authenticate.jwt);
    }
  }

  return {
    isAuthenticated: !!authToken,
    signIn,
    signOut,
    register,
  };
}
