import { NextResponse, NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/lib/i18n/routing";
import { env } from "@/env";

const ignorableFileExtensions = ["woff", "ico", "png", "jpeg", "jpg"];
const deployedEnvironments: Array<typeof env.CLOUD_ENV> = [
  "DEV",
  "INT",
  "PROD",
];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Insight into API server:
  const logEntry: Record<string, any> = {
    httpRequest: {
      name: "NEXTJS_API_SERVER_LOG",
      hostname: process.env.HOSTNAME,
      href: request.nextUrl.href,
      method: request.method,
      client_ip: request.ip,
      userAgent: request.headers.get("user-agent"),
      xForwardedFor: request.headers.get("x-forwarded-for"),
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
    const i18nRouter = createMiddleware(routing);
    const res = i18nRouter(request);

    logEntry.httpRequest.status = res.status;
    logEntry.httpRequest.redirected = res.redirected;

    // Filter out file extensions we don't care about
    if (
      !ignorableFileExtensions.some((e) =>
        request.nextUrl.pathname.includes(e)
      ) &&
      deployedEnvironments.includes(env.CLOUD_ENV)
    ) {
      console.info(JSON.stringify(logEntry));
    }

    return res;
  }
}

export const config = {
  matcher: ["/sso-redirect/", "/((?!api|static|.*\\..*|_next).*)"],
};
