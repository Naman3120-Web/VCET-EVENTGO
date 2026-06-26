import { NextResponse } from "next/server";

export async function middleware(request) {
  const useremail = "andydan3030@gmail.com";

  const path = request.nextUrl.pathname;

  if (!useremail && path.startsWith("admin/*")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (useremail === "deptuser@gmail.com" && path.startsWith("admin/*")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/department/:path*"],
};
