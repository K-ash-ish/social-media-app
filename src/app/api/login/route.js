import { prisma } from "@/lib/db";
import { compare } from "@/lib/hash";
import { refreshSign, sign } from "@/lib/jwt";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  const { email, password } = await req.json();
  const reqUser = await prisma.user.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
    include: {
      profile: true,
    },
  });
  if (reqUser) {
    const isValidPassword = await compare(reqUser.password, password);

    if (isValidPassword) {
      const accessToken = await sign({
        accessLevel: "user",
        id: reqUser.id,
        userHandle: reqUser.profile?.userHandle,
        profileId: reqUser.profile?.id || null,
        name: reqUser.profile.name,
      });
      const refreshToken = await refreshSign({
        id: reqUser.id,
      });
      cookies().set({
        name: "accessToken",
        value: accessToken,
        httpOnly: true,
        expires: Date.now() + 15 * 60 * 1000,
      });
      cookies().set({
        name: "refreshToken",
        value: refreshToken,
        httpOnly: true,
        expires: Date.now() + 7 * 86400 * 1000,
      });
      const userProfile = await prisma.profile.findFirst({
        where: {
          userId: {
            equals: reqUser.id,
          },
        },
      });
      return NextResponse.json(
        { data: userProfile, message: "Login Successfull" },
        { status: 200 }
      );
    }
  }
  return NextResponse.json({ error: "wrong credentials" }, { status: 401 });
}
