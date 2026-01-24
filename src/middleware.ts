import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { authKey } from "./lib";
import { jwtDecode } from "jwt-decode";

const operatorPath = [
  "/operator/dashboard",
  "/operator/events",
  "/operator/pricing",
  "/operator/privacy-policy",
  "/operator/faq",
  "/operator/notification",
  "/operator/profile",
  "/operator/conversation",
];
const userPath = [
  "/events",
  "/booking",
  "/contact-us",
  "/resources",
  "/profile",
  "/notification",
  "/conversation",
  "/favorite-events",
];
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookiesStore = await cookies();
  const token = cookiesStore.get(authKey)?.value;
  const decoded: any = token && jwtDecode(token as string);
  const roleKey = decoded?.role as string;

  if (!token) {
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", request.url));
    } else if (operatorPath.includes(pathname)) {
      return NextResponse.redirect(new URL("/operator", request.url));
    } else if (userPath.includes(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }


  //  ============ admin =========
  if (roleKey === "admin") {
    if (pathname === "/" || pathname === "/operator") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    const regex = /^\/admin\/*/;
    if (regex.test(pathname)) {
      return NextResponse.next();
    }
  } else if (roleKey === "operator") {
    if (pathname === "/operator" || pathname === "/admin" || pathname === "/") {
      return NextResponse.redirect(new URL("/operator/dashboard", request.url));
    }
    if (operatorPath.includes(pathname)) {
      return NextResponse.next();
    }
  } else if (roleKey === "user") {
    if (pathname === "/admin" || pathname === "/operator") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (userPath.includes(pathname)) {
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: ["/", "/admin/:path*", ...operatorPath, ...userPath],
};
