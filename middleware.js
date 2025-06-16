import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

const protectedRoutes = ["/", "/profile", "/settings"];
const authRoutes = ["/login", "/register"];

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;

  // Skip static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/images")
  ) {
    return NextResponse.next();
  }

  const sessionid = await req.cookies.get("sessionid")?.value;
  const verifiedUser = sessionid ? await verifyToken(sessionid) : null;

  // Redirect unauthenticated users from protected routes
  if (
    !verifiedUser &&
    protectedRoutes.some(
      (route) => pathname === route || pathname.startsWith(route + "/")
    )
  ) {
    if (pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Redirect authenticated users away from auth routes
  if (
    verifiedUser &&
    authRoutes.some(
      (route) => pathname === route || pathname.startsWith(route + "/")
    )
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
