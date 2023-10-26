import { prisma } from "@/lib/db";
import { compare } from "@/lib/hash";
import { sign } from "@/lib/jwt";
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
        email: reqUser.email,
        id: reqUser.id,
        userHandle: reqUser.profile?.userHandle,
        profileId: reqUser.profile?.id || null,
      });
      const oneWeek = 7 * 86400 * 1000;
      const expiry = Date.now() + oneWeek;
      const expiryDate = new Date(expiry);

      console.log(expiryDate);
      cookies().set({
        name: "accessToken",
        value: accessToken,
        httpOnly: true,
        expires: expiryDate,
      });
      const userProfile = await prisma.profile.findFirst({
        where: {
          userId: {
            equals: reqUser.id,
          },
        },
      });
      return NextResponse.json({ message: userProfile }, { status: 200 });
    }
  }
  return NextResponse.json({ error: "wrong credentials" }, { status: 401 });
}
