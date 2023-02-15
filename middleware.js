import { NextResponse } from "next/server";
const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const {
    nextUrl: { search },
  } = request;
  const urlSearchParams = new URLSearchParams(search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const { state: redirectPath, facebook, code } = params;
  if (redirectPath && facebook && code) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = redirectPath;
    return NextResponse.redirect(redirectUrl);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/sso-redirect/",
};
