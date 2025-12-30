import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { authKey } from "./lib";
import { jwtDecode } from "jwt-decode";

const roleConfig = {
  admin: {
    basePath: "/admin",
    allowedPaths: /^\/admin\/*/,
  },
  // reviewer: {
  //   basePath: "/operator",
  //   allowedPaths: /^\/operator\/*/,
  // },
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookiesStore = await cookies();
  const token = cookiesStore.get(authKey)?.value;
  const decoded: any = token && jwtDecode(token as string);
  const roleKey = decoded?.role as string;

  // console.log(decoded);

  if (!token) {
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }
  const config = roleConfig[roleKey as keyof typeof roleConfig];

  if (config) {
    if (pathname === "/") {
      return NextResponse.redirect(new URL(config.basePath, request.url));
    }

    if (config.allowedPaths.test(pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/", "/admin/:path*"],
};
