import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { authKey, roleKey } from "./lib";
import { jwtDecode } from "jwt-decode";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n";

const intlMiddleware = createIntlMiddleware(routing);

const operatorRoutes = [
  "/operator/dashboard",
  "/operator/events",
  "/operator/pricing",
  "/operator/privacy-policy",
  "/operator/faq",
  "/operator/notification",
  "/operator/profile",
  "/operator/conversation",
];

const userRoutes = [
  "/events",
  "/booking",
  "/contact-us",
  "/resources",
  "/profile",
  "/notification",
  "/conversation",
  "/favorite-events",
];

const adminRoutes = ["/admin"];

const matchRoute = (routes: string[], pathname: string) =>
  routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

// ✔ remove locale
const stripLocale = (pathname: string) => {
  const hasLocale = routing.locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  return hasLocale ? pathname.replace(/^\/[^/]+/, "") || "/" : pathname;
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ FIX 1: static files completely bypass
  if (
    pathname.startsWith("/img/") ||
    pathname.startsWith("/icons/") ||
    pathname.startsWith("/fonts/") ||
    /\.(?:png|jpg|jpeg|gif|svg|ico|webp|woff|woff2)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const cleanPath = stripLocale(pathname);

  const cookiesStore = await cookies();
  const token = cookiesStore.get(authKey)?.value;

  // ================= NO TOKEN =================
  if (!token) {
    if (matchRoute(adminRoutes, cleanPath)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (matchRoute(operatorRoutes, cleanPath)) {
      return NextResponse.redirect(new URL("/operator", request.url));
    }

    return intlMiddleware(request);
  }

  // ================= ROLE CHECK =================
  const decoded: any = jwtDecode(token);
  const role = decoded?.role;

  const isOperator = matchRoute(operatorRoutes, cleanPath);
  const isUser = matchRoute(userRoutes, cleanPath);
  const isAdmin = matchRoute(adminRoutes, cleanPath);

  const userPath = cleanPath === "/";
  const operatorPath = cleanPath === "/operator";

  if (role === roleKey.user) {
    if (isAdmin || isOperator || operatorPath) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return intlMiddleware(request);
  }

  if (role === roleKey.operator) {
    if (isAdmin || isUser || userPath) {
      return NextResponse.redirect(new URL("/operator", request.url));
    }
    if (operatorPath) {
      return NextResponse.redirect(
        new URL("/operator/dashboard", request.url)
      );
    }
    return intlMiddleware(request);
  }

  if (role === roleKey.admin) {
    if (isUser || isOperator || userPath || operatorPath) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return intlMiddleware(request);
  }

  return NextResponse.redirect(new URL("/", request.url));
}
// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
// };

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico).*)",
  ],
};