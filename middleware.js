import { NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { fallbackLng, languages } from "./lib/i18n/settings";

const ignorableFileExtensions = ["woff", "ico", "png", "jpeg", "jpg"];

// This function can be marked `async` if using `await` inside
export function middleware(request) {
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

  // For SSO redirects:
  if (request.nextUrl.pathname.includes("sso-redirect")) {
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
    const handleI18nRouting = createIntlMiddleware({
      // A list of all locales that are supported
      locales: languages,
      localePrefix: "as-needed",

      // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
      defaultLocale: fallbackLng,
    });
    const res = handleI18nRouting(request);

    logEntry.httpRequest.status = res.status;
    logEntry.httpRequest.redirected = res.redirected;

    // Filter out file extensions we don't care about
    if (
      !ignorableFileExtensions.some((e) =>
        request.nextUrl.pathname.includes(e)
      ) &&
      !request.nextUrl.href.includes("localhost")
    ) {
      console.info(JSON.stringify(logEntry));
    }

    return res;
  }
}

// do not localize next.js paths
export const config = {
  matcher: ["/sso-redirect/", "/((?!api|static|.*\\..*|_next).*)"],
};
