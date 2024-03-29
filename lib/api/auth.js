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
          status
          ... on User {
            requestDeletion
            preferredLanguage
          }
        }
      }
    }`;
  const data = await queryAPI(query, token);
  return data;
}

export async function authenticateGoogle({ idToken, pendingGroup }) {
  const schema = pendingGroup === "educators" ? "Educators" : "Students";

  const query = gql`
    mutation GoogleSignIn {
      googleSignIn${schema}(
        idToken: "${idToken}"
      ) {
        jwt
        jwtExpiresAt
        refreshToken
        refreshTokenExpiresAt
        user {
          status
          ... on User {
            requestDeletion
            preferredLanguage
          }
        }
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

export async function authenticateFacebook({ code, pendingGroup }) {
  const schema = pendingGroup === "educators" ? "Educators" : "Students";

  const query = gql`
    mutation FacebookSignIn {
      facebookSignIn${schema}(code: "${code}") {
        jwt
        jwtExpiresAt
        refreshToken
        refreshTokenExpiresAt
        user {
          status
          ... on User {
            requestDeletion
            preferredLanguage
          }
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
    mutation RegisterStudents {
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
          status
          ... on User {
            requestDeletion
          }
        }
      }
    }
  `;
  const data = await queryAPI(query, token);
  return data;
}

export async function registerEducator({
  email,
  password,
  firstName,
  lastName,
  token,
}) {
  const query = gql`
    mutation RegisterEducators {
      registerEducators(
        email: "${email}"
        password: "${password}"
        fullName: "${firstName} ${lastName}") {  
        user {
          status
          ... on User {
            requestDeletion
          }
        }
        jwt
        jwtExpiresAt
        refreshToken
        refreshTokenExpiresAt
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

export async function updatePassword({
  currentPassword,
  newPassword,
  confirmPassword,
  tokenFetcher,
}) {
  const tokenData = await tokenFetcher();

  if (!tokenData?.jwt) return { error: true, errorType: "session_expired" };

  const query = gql`
    mutation UpdatePassword {
      updatePassword(
        currentPassword: "${currentPassword}"
        newPassword: "${newPassword}"
        confirmPassword: "${confirmPassword}"
      )
    }
  `;
  const data = await queryAPI(query, tokenData.jwt);
  return data;
}

export async function setNewPassword({ password, code, id }) {
  const query = gql`
    mutation SetPassword {
      setPassword(
        password: "${password}"
        code: "${code}"
        id: "${id}"
      )
    }
  `;
  const data = await queryAPI(query);
  return data;
}

export async function activate({ code, id }) {
  const query = gql`
    mutation ActivateUser {
      activateUser(
        code: "${code}"
        id: "${id}"
      )
    }
  `;
  const data = await queryAPI(query);
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
        user {
          status
          ... on User {
            requestDeletion
          }
        }
      }
    }
  `;
  const data = await queryAPI(query);
  return data;
}

export async function fetchUser(token) {
  const query = gql`
    query Viewer {
      viewer {
        email
        firstName
        lastName
        status
        ... on User {
          emailSubscription
          preferredLanguage
          school
          requestDeletion
        }
      }
    }
  `;
  const data = await queryAPI(query, token);
  return data;
}

export async function updateUser(userData, tokenFetcher) {
  const tokenData = await tokenFetcher();

  if (!tokenData?.jwt) return { error: true, errorType: "session_expired" };

  const updates = Object.keys(userData)
    .map((key) => `${key}: ${JSON.stringify(userData[key])}`)
    .join("\n");
  const query = gql`
    mutation UpdateViewer {
      updateViewer(
        ${updates}
      ) {
        email
        firstName
        lastName
        ... on User {
          emailSubscription
          preferredLanguage
          school
          requestDeletion
        }
      }
    }
  `;

  const data = await queryAPI(query, tokenData.jwt);
  return data;
}

export async function requestDeletion(token) {
  const query = gql`
    mutation UpdateViewer {
      updateViewer(requestDeletion: ["requested"]) {
        ... on User {
          requestDeletion
        }
      }
    }
  `;

  const data = await queryAPI(query, token);
  return data;
}
