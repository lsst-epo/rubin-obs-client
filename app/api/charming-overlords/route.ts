import { OAuth2Client } from "google-auth-library";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env";

const GOOGLE_APP_ID = env.NEXT_PUBLIC_GOOGLE_APP_ID;
const GOOGLE_APP_SECRET = env.GOOGLE_APP_SECRET;

const oAuth2Client = new OAuth2Client(
  GOOGLE_APP_ID,
  GOOGLE_APP_SECRET,
  "postmessage"
);

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { code } = await request.json();

  if (!code) {
    console.info(
      "[CLIENT_REVALIDATE_STATUS] Returning a 422 in app/api/charming-overlords/route.ts"
    );
    return new NextResponse("Missing authorization code", { status: 422 });
  }

  try {
    const {
      tokens: { id_token: idToken },
    } = await oAuth2Client.getToken(code);

    return NextResponse.json({ idToken }, { status: 200 });
  } catch (err) {
    return new NextResponse("Not authorized", { status: 401 });
  }
}
