import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Dealer portal auth guard — allow login page, protect everything else
  if (pathname.includes("/dealer-portal") && !pathname.includes("/dealer-portal/login")) {
    const authCookie = request.cookies.get("dealer-auth");
    if (!authCookie?.value || authCookie.value !== "authorized") {
      const locale = pathname.split("/")[1] || "en";
      const loginUrl = new URL(`/${locale}/dealer-portal/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|downloads|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|pdf)).*)",
  ],
};
