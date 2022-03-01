import { gql } from "graphql-request";
import { queryAPI } from "@/lib/fetch";

// https://graphql-authentication.jamesedmonston.co.uk/usage/authentication

export async function authenticate({ email, password }) {
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
          fullName
        }
      }
    }`;
  const data = await queryAPI(query);
  console.log(data);
  return data;
}

export async function authenticateGoogle() {
  const query = gql`
    mutation GoogleSignIn {
      googleSignIn(idToken: "...") {
        jwt
        jwtExpiresAt
        refreshToken
        refreshTokenExpiresAt
        user {
          id
          fullName
        }
      }
    }
  `;
  const data = await queryAPI(query);
  return data;
}

export async function getFacebookOauthUrl() {
  const query = gql`
    {
      facebookOauthUrl
    }
  `;
  const data = await queryAPI(query);
  return data;
}

export async function authenticateFacebook() {
  const query = gql`
    mutation FacebookSignIn {
      facebookSignIn(code: "...") {
        jwt
        jwtExpiresAt
        refreshToken
        refreshTokenExpiresAt
        user {
          id
          fullName
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
          fullName
        }
      }
    }
  `;
  const data = await queryAPI(query);
  return data;
}

export async function registerTeacher({
  email,
  password,
  firstName,
  lastName,
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
          fullName
        }
      }
    }
  `;
  const data = await queryAPI(query);
  return data;
}

export async function forgottenPassword({ email }) {
  const query = gql`
    mutation ForgottenPassword {
      forgottenPassword(
        email: "${email}"
      )
    }`;
  const data = await queryAPI(query);
  return data;
}
