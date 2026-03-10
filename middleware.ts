import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);
const locales = new Set<string>(routing.locales);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];
  const locale = locales.has(firstSegment) ? firstSegment : routing.defaultLocale;

  // Dealer portal auth guard
  if (pathname.includes("/dealer-portal") && !pathname.includes("/dealer-portal/login")) {
    const authCookie = request.cookies.get("dealer-auth");
    if (!authCookie?.value || authCookie.value !== "authorized") {
      const loginUrl = new URL(`/${locale}/dealer-portal/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Admin panel auth guard
  if (pathname.includes("/admin") && !pathname.includes("/admin/login")) {
    const authCookie = request.cookies.get("admin-auth");
    if (!authCookie?.value || authCookie.value !== "authorized") {
      const loginUrl = new URL(`/${locale}/admin/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|videos|downloads|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|pdf|mp4|webm)).*)",
  ],
};
