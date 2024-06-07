import { NextResponse } from "next/server";

const ignorableFileExtensions = ["woff", "ico", "png", "jpeg", "jpg"];

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  // Filter out file extensions we don't care about
  if (
    !ignorableFileExtensions.some((e) => request.nextUrl.pathname.includes(e))
  ) {
    // Insight into API server:
    const logEntry = {
      httpRequest: {
        name: "NEXTJS_API_SERVER_LOG",
        hostname: process.env.HOSTNAME,
        href: request.nextUrl.href,
        method: request.method,
        client_ip: request.ip,
      },
    };

    console.info(logEntry);

    const res = NextResponse.next();
    logEntry.status = res.status;
    logEntry.redirected = res.redirected;

    return res;
  }

  // For SSO redirects:
  if (request.nextUrl.pathname.includes("/sso-redirect/")) {
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
}

// Match anything and let the middleware decide to redirect or log
export const config = {
  matcher: "/((?!_____).*)",
};
