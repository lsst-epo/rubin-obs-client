import { useState } from "react";
import {
  authenticate,
  registerTeacher,
  registerStudent,
  forgottenPassword,
} from "@/lib/api/auth";

export default function useAuthentication() {
  const [token, setToken] = useState(null);

  async function signIn({ email, password }) {
    const data = await authenticate({ email, password, token });

    if (data?.authenticate?.jwt) {
      setToken(data.authenticate.jwt);
    }

    return data;
  }

  function signOut() {
    setToken(null);
  }

  async function register({ email, password, fullName, role }) {
    const registerMethod =
      role === "teacher" ? registerTeacher : registerStudent;

    if (!fullName) return;

    const name = fullName.split(" ");
    const firstName = name[0];
    const lastName =
      name.length > 1 ? fullName.slice(firstName.length + 1) : "";

    const data = await registerMethod({
      email,
      password,
      firstName,
      lastName,
      token,
    });

    const returnRole =
      role === "teacher" ? "registerTeachers" : "registerStudents";

    if (data?.[returnRole]?.jwt) {
      setToken(data[returnRole].jwt);

      return data[returnRole];
    } else {
      return data;
    }
  }

  async function forgotPassword({ email }) {
    const data = await forgottenPassword({ email, token });

    if (data?.forgottenPassword) {
      return data.forgottenPassword;
    } else {
      return data;
    }
  }

  return {
    isAuthenticated: !!token,
    signIn,
    signOut,
    register,
    forgotPassword,
  };
}
