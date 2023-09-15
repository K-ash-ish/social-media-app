import { prisma } from "@/lib/db";
import { hash } from "@/lib/hash";
import { sign } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();
  const isUserPresent = await prisma.user.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
  });
  if (isUserPresent) {
    return NextResponse.json(
      { error: "Email Already in Use" },
      { status: 409 }
    );
  }
  const hashedPassword = await hash(password);

  const newUser = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
      authType: "PASSWORD",
    },
  });

  const token = await sign({
    accessLevel: "user",
    email: newUser.email,
    id: newUser.id,
    userHandle: newUser.profile?.userHandle,
    profileId: newUser.profile?.id || null,
  });

  const oneWeek = 7 * 24 * 60 * 60 * 1000;

  cookies().set({
    name: "token",
    value: token,
    httpOnly: true,
    expires: Date.now() + oneWeek,
  });

  return NextResponse.json({ message: "Account Created" }, { status: 200 });
}
