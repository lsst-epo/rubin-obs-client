import { useState } from "react";
import {
  authenticate,
  registerTeacher,
  registerStudent,
  forgottenPassword,
} from "@/lib/api/auth";

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

    if (!fullName) return;

    const name = fullName.split(" ");
    const firstName = name[0];
    const lastName =
      name.length > 1 ? fullName.slice(firstName.length + 1) : "";

    const data = await registerMethod({ email, password, firstName, lastName });

    const returnRole =
      role === "teacher" ? "registerTeachers" : "registerStudents";

    if (data?.[returnRole]?.jwt) {
      setAuthToken(data[returnRole].jwt);

      return data[returnRole];
    }
  }

  async function forgotPassword({ email }) {
    const data = await forgottenPassword({ email });

    if (data?.forgottenPassword) {
      return data.forgottenPassword;
    }
  }

  return {
    isAuthenticated: !!authToken,
    signIn,
    signOut,
    register,
    forgotPassword,
  };
}
