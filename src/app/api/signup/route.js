import { prisma } from "@/lib/db";
import { hash } from "@/lib/hash";
import { refreshSign, sign } from "@/lib/jwt";
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
  if (newUser) {
    const accessToken = await sign({
      accessLevel: "user",
      email: newUser.email,
      id: newUser.id,
    });

    const refreshToken = await refreshSign({
      id: newUser.id,
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
  }

  return NextResponse.json({ message: "Account Created" }, { status: 200 });
}
