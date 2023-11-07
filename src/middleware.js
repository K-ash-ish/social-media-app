import { NextResponse } from "next/server";
import { refreshVerify, verify } from "./lib/jwt";

async function isAuthenticated(req) {
  const accessToken = req?.cookies?.get("accessToken")?.value;

  if (!accessToken) {
    return false;
  }

  const isVerified = await verify(accessToken);

  if (!isVerified) {
    return false;
  }
  return true;
}

async function isRefreshToken(req) {
  const refreshToken = req?.cookies?.get("refreshToken")?.value;
  if (!refreshToken) {
    return false;
  }
  const isRefreshTVerified = await refreshVerify(refreshToken);
  const { id } = isRefreshTVerified?.payload;
  return id;
}
async function getNewAccessToken(id) {
  const newToken = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}api/refresh-token`,
    {
      method: "POST",
      body: JSON.stringify({ id }),
      credentials: "include",
    }
  )
    .then((data) => data.json())
    .then((data) => data);
  return newToken;
}

export async function middleware(request) {
  const response = NextResponse.next();
  const auth = await isAuthenticated(request);

  if (request.nextUrl.pathname === "/login" && auth) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!auth) {
    const id = await isRefreshToken(request);
    if (!id) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    const { newAccessToken } = await getNewAccessToken(id);
    response.cookies.set({
      name: "accessToken",
      value: newAccessToken,
      httpOnly: true,
      expires: Date.now() + 15 * 60 * 1000,
    });

    return response;
  }

  return response;
}
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|vercel.svg|next.svg|api/login|api/refresh-token|signup|api/signup).*)",
  ],
};
