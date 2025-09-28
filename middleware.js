import { NextResponse } from "next/server";

const PUBLIC_PATHS = [
  "/login",
  "/api/auth",         
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
];

function isPublicPath(pathname) {
  if (PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p))) return true;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/public")
  ) {
    return true;
  }
  return false;
}

export function middleware(req) {
  const { pathname } = req.nextUrl;

 
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }


  const isProtected =
    pathname === "/" ||
    pathname.startsWith("/user") ||
    pathname.startsWith("/agent") ||
    pathname.startsWith("/listings") ||
    pathname.startsWith("/help") ||
    pathname.startsWith("/reports") || 
    pathname.startsWith("/profile") ||
    pathname.startsWith("/verification") ||
    pathname.startsWith("/notifications") ||
    pathname.startsWith("/about") ||
    pathname.startsWith("/terms") ||
    pathname.startsWith("/privacy") ;

  if (!isProtected) return NextResponse.next();

 
  const isLoggedIn =
    req.cookies.get("next-auth.session-token") ||
    req.cookies.get("__Secure-next-auth.session-token");

  if (!isLoggedIn) {
    const url = new URL("/login", req.url);
    url.searchParams.set("redirect", pathname || "/");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  
  matcher: ["/", "/user/:path*", "/agent/:path*", "/listings/:path*", "/help/:path*", "/reports/:path*", "/profile/:path*", "/verification/:path*", "/notifications/:path*", "/about/:path*" , "/terms/:path*", "/privacy/:path*"],
};
