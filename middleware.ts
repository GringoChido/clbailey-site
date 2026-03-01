import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);
const locales = new Set<string>(routing.locales);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Dealer portal auth guard — allow login page, protect everything else
  if (pathname.includes("/dealer-portal") && !pathname.includes("/dealer-portal/login")) {
    const authCookie = request.cookies.get("dealer-auth");
    if (!authCookie?.value || authCookie.value !== "authorized") {
      // Extract locale from path, falling back to default if segment isn't a known locale
      const firstSegment = pathname.split("/")[1];
      const locale = locales.has(firstSegment) ? firstSegment : routing.defaultLocale;
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
