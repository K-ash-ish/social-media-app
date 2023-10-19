import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verify } from "./lib/jwt";

async function isAuthenticated(req) {
  const token = req?.cookies?.get("token")?.value;
  if (!token) {
    return false;
  }
  const isVerified = await verify(token);
  if (!isVerified) {
    return false;
  }
  return true;
}

export async function middleware(request) {
  //   console.log(request.url);
  const auth = await isAuthenticated(request);
  if (!auth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|vercel.svg|next.svg|login|api/login).*)",
  ],
};
