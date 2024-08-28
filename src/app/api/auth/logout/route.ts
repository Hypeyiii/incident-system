import { serialize } from "cookie";
import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const tokenCookie = req.cookies.get("token");
  const token = tokenCookie ? tokenCookie.value : undefined;

  if (!token) {
    return NextResponse.json(
      { success: false, error: "No token provided" },
      { status: 401 }
    );
  }

  try {
    verify(token, "secret-json-web-token");

    const serializedToken = serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    const response = NextResponse.json({
      success: true,
      message: "Logged out",
    });
    response.headers.set("Set-Cookie", serializedToken);
    return response;
  } catch (err) {
    console.error("Error logging out:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
