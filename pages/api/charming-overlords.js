import { OAuth2Client } from "google-auth-library";

const GOOGLE_APP_ID = process.env.NEXT_PUBLIC_GOOGLE_APP_ID;
const GOOGLE_APP_SECRET = process.env.GOOGLE_APP_SECRET;

const oAuth2Client = new OAuth2Client(
  GOOGLE_APP_ID,
  GOOGLE_APP_SECRET,
  "postmessage"
);

// exchanges Auth Code for Tokens
async function getTokens(code) {
  const { tokens } = await oAuth2Client.getToken(code);
  return tokens;
}

export default async function handler(req, res) {
  try {
    const { id_token: idToken } = await getTokens(req.body.code);
    res.status(200).json({ idToken });
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
