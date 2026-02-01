import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { authKey, roleKey } from "./lib";
import { jwtDecode } from "jwt-decode";

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
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookiesStore = await cookies();
  const token = cookiesStore.get(authKey)?.value;

  if (!token) {
    cookiesStore.delete(authKey);
    if (matchRoute(adminRoutes, pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (matchRoute(operatorRoutes, pathname)) {
      return NextResponse.redirect(new URL("/operator", request.url));
    }
    return NextResponse.next();
  }
  // ================ role base access ================
  const decoded: any = jwtDecode(token);
  const role = decoded?.role;

  const isOperator = matchRoute(operatorRoutes, pathname);
  const isUser = matchRoute(userRoutes, pathname);
  const isAdmin = matchRoute(adminRoutes, pathname);

  const userPath = pathname === "/";
  const operatorPath = pathname === "/operator";

  if (role === roleKey.user) {
    if (isAdmin || isOperator || operatorPath) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  } else if (role === roleKey.operator) {
    if (isAdmin || isUser || userPath) {
      return NextResponse.redirect(new URL("/operator", request.url));
    } else if (operatorPath) {
      return NextResponse.redirect(new URL("/operator/dashboard", request.url));
    }
    return NextResponse.next();
  } else if (role === roleKey.admin) {
    if (isUser || isOperator || userPath || operatorPath) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
