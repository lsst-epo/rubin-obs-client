import { NextResponse } from "next/server";
import { i18nRouter } from "next-i18n-router";
import { cookieName, fallbackLng, languages } from "./lib/i18n/settings";

const ignorableFileExtensions = ["woff", "ico", "png", "jpeg", "jpg"];

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  console.info("Got to the middleware!");
  // Insight into API server:
  const logEntry = {
    httpRequest: {
      name: "NEXTJS_API_SERVER_LOG",
      hostname: process.env.HOSTNAME,
      href: request.nextUrl.href,
      method: request.method,
      client_ip: request.ip,
      userAgent: request?.headers?.["user-agent"],
      xForwardedFor: request?.headers?.["x-forwarded-for"],
    },
  };
  console.info("Logging object:", logEntry);

  // For SSO redirects:
  if (request.nextUrl.pathname.includes("sso-redirect")) {
    console.info("Got into sso-redirect block");
    const {
      nextUrl: { search },
    } = request;

    const urlSearchParams = new URLSearchParams(search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const { state: redirectPath, facebook, code } = params;
    if (redirectPath && facebook && code) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = redirectPath;

      logEntry.httpRequest.redirected = true;
      console.info(JSON.stringify(logEntry));
      return NextResponse.redirect(redirectUrl);
    }
  } else {
    console.info("Got into else block");
    const res = i18nRouter(request, {
      locales: languages,
      defaultLocale: fallbackLng,
      localeCookie: cookieName,
      routingStrategy: "dynamicSegment",
    });

    logEntry.httpRequest.status = res.status;
    logEntry.httpRequest.redirected = res.redirected;

    console.info(`request.nextUrl.href: ${request.nextUrl.href}`);
    // Filter out file extensions we don't care about
    if (
      !ignorableFileExtensions.some((e) =>
        request.nextUrl.pathname.includes(e)
      ) &&
      !request.nextUrl.href.includes("localhost")
    ) {
      console.info(JSON.stringify(logEntry));
    } else {
      console.info("Got into log else!");
    }

    return res;
  }
}

// do not localize next.js paths
export const config = {
  matcher: ["/sso-redirect/", "/((?!api|static|.*\\..*|_next).*)"],
};
