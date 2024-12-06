import { NextResponse } from "next/server";
import { refreshVerify } from "./lib/jwt";

async function isAuthenticated(req, res) {
  const accessToken = req?.cookies?.get("accessToken")?.value;

  if (accessToken) {
    return true;
  }
  const refreshToken = req?.cookies?.get("refreshToken")?.value;
  if (!refreshToken) {
    return false;
  }
  const isRefreshTokenVerified = await refreshVerify(refreshToken);
  const { newAccessToken } = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}api/refresh-token`,
    {
      method: "POST",
      body: JSON.stringify({ id: isRefreshTokenVerified.payload.id }),
      credentials: "include",
    }
  )
    .then((data) => data.json())
    .then((data) => data);
  res.cookies.set({
    name: "accessToken",
    value: newAccessToken,
    httpOnly: true,
    expires: Date.now() + 15 * 60 * 1000,
  });
  return true;
}

export async function middleware(request) {
  const response = NextResponse.next();
  const isAuth = await isAuthenticated(request, response);
  const url = request.url;
  if (!isAuth) {
    if (url.includes("login") || url.includes("signup")) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", url));
  }
  if (url.includes("login") || url.includes("signup")) {
    return NextResponse.redirect(new URL("/", url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|vercel.svg|next.svg|api/login|api/refresh-token|signup|api/signup|api/logout|api/uploadthing).*)",
  ],
};
