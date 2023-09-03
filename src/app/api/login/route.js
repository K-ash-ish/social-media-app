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
    console.log(reqUser);
    if (isValidPassword) {
      const token = await sign({
        accessLevel: "user",
        email: reqUser.email,
        id: reqUser.id,
        profileId: reqUser.profile.id || null,
      });
      const oneDay = 24 * 60 * 60 * 1000;

      cookies().set({
        name: "token",
        value: token,
        httpOnly: true,
        expires: Date.now() + oneDay,
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
  return NextResponse.json({ error: "wrong credentials" }, { status: 400 });
}
