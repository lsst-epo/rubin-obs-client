import { gql } from "graphql-request";
import { queryAPI } from "@/lib/fetch";

// https://graphql-authentication.jamesedmonston.co.uk/usage/authentication

export async function authenticate({ email, password, token }) {
  const query = gql`
    mutation Authenticate {
      authenticate(
        email: "${email}"
        password: "${password}"
      ) {
        jwt
        jwtExpiresAt
        refreshToken
        refreshTokenExpiresAt
        user {
          id
          email
          fullName
          status
          preferences
          preferredLanguage
        }
      }
    }`;
  const data = await queryAPI(query, token);
  return data;
}

export async function authenticateGoogle({ idToken, role = "students" }) {
  const schema = role === "teacher" ? "Teachers" : "Students";

  const query = gql`
    mutation GoogleSignIn {
      googleSignIn${schema}(
        idToken: "${idToken}"
      ) {
        jwt
        jwtExpiresAt
        refreshToken
        refreshTokenExpiresAt
      }
    }
  `;
  const data = await queryAPI(query);
  return data;
}

export async function getFacebookOauthUrl() {
  const query = gql`
    query FacebookOauthUrl {
      facebookOauthUrl
    }
  `;
  const data = await queryAPI(query);
  return data;
}

export async function authenticateFacebook({ code, role = "students" }) {
  const schema = role === "teacher" ? "Teachers" : "Students";

  const query = gql`
    mutation FacebookSignIn {
      facebookSignIn${schema}(code: "${code}") {
        jwt
        jwtExpiresAt
        refreshToken
        refreshTokenExpiresAt
        user {
          id
          email
          fullName
          status
          preferences
          preferredLanguage
        }
      }
    }
  `;
  const data = await queryAPI(query);
  return data;
}

export async function registerStudent({
  email,
  password,
  firstName,
  lastName,
  token,
}) {
  const query = gql`
    mutation RegisterStudent {
      registerStudents(
        email: "${email}"
        password: "${password}"
        firstName: "${firstName}"
        lastName: "${lastName}"
      ) {
        jwt
        jwtExpiresAt
        refreshToken
        refreshTokenExpiresAt
        user {
          id
          email
          fullName
          status
          preferences
          preferredLanguage
        }
      }
    }
  `;
  const data = await queryAPI(query, token);
  return data;
}

export async function registerTeacher({
  email,
  password,
  firstName,
  lastName,
  token,
}) {
  const query = gql`
    mutation RegisterTeacher {
      registerTeachers(
        email: "${email}"
        password: "${password}"
        firstName: "${firstName}"
        lastName: "${lastName}"
      ) {
        jwt
        jwtExpiresAt
        refreshToken
        refreshTokenExpiresAt
        user {
          id
          email
          fullName
          status
          preferences
          preferredLanguage
        }
      }
    }
  `;
  const data = await queryAPI(query, token);
  return data;
}

export async function forgottenPassword({ email, token }) {
  const query = gql`
    mutation ForgottenPassword {
      forgottenPassword(
        email: "${email}"
      )
    }`;
  const data = await queryAPI(query, token);
  return data;
}

export async function refreshJWT({ refreshToken }) {
  const query = gql`
    mutation RefreshToken {
      refreshToken(refreshToken: "${refreshToken}") {
        jwt
        jwtExpiresAt
        refreshToken
        refreshTokenExpiresAt
      }
    }
  `;
  const data = await queryAPI(query);
  return data;
}
