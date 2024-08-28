import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export default async function middleware(req: NextRequest) {
  const tokenCookie = req.cookies.get("token");
  const jwt = tokenCookie ? tokenCookie.value : undefined;

  const dashboardUrl = new URL("/admin", req.nextUrl.origin);
  const userUrl = new URL("/user", req.nextUrl.origin);
  const homeUrl = new URL("/", req.nextUrl.origin);

  if (req.nextUrl.pathname === "/admin") {
    if (jwt === undefined) {
      return NextResponse.redirect(homeUrl);
    }
    try {
      const { payload } = await jwtVerify(
        jwt,
        new TextEncoder().encode("secret-json-web-token")
      );
      if (payload.rol_id !== 2) return NextResponse.redirect(userUrl);
      return NextResponse.next();
    } catch (err) {
      console.error("JWT verification error:", err);
      return NextResponse.redirect(homeUrl);
    }
  }

  if (req.nextUrl.pathname === "/user") {
    if (jwt === undefined) {
      return NextResponse.redirect(homeUrl);
    }
    try {
      const { payload } = await jwtVerify(
        jwt,
        new TextEncoder().encode("secret-json-web-token")
      );
      return NextResponse.next();
    } catch (err) {
      console.error("JWT verification error:", err);
      return NextResponse.redirect(homeUrl);
    }
  }

  if (req.nextUrl.pathname === "/") {
    if (jwt !== undefined) {
      try {
        const { payload } = await jwtVerify(
          jwt,
          new TextEncoder().encode("secret-json-web-token")
        );
        if (payload.rol_id === 1) return NextResponse.redirect(userUrl);

        return NextResponse.redirect(dashboardUrl);
      } catch (err) {
        console.error("JWT verification error:", err);
      }
    }
  }
}
