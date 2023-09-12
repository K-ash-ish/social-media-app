import { prisma } from "@/lib/db";
import { sign, verify } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const profileDetails = await req.json();
  const token = cookies().get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authorised" }, { status: 401 });
  }
  const isTokenverified = await verify(token);
  if (!isTokenverified) {
    return NextResponse.json({ error: "Not authorised" }, { status: 400 });
  }
  try {
    const newProfile = await prisma.profile.create({
      data: {
        bio: profileDetails?.bio,
        name: profileDetails?.name,
        userHandle: profileDetails?.userHandle,
        profilePic: profileDetails?.profilePic,
        userId: isTokenverified.payload.id,
      },
    });

    const token = await sign({
      accessLevel: "user",
      email: isTokenverified?.payload?.email,
      id: isTokenverified?.payload?.id,

      userHandle: profileDetails?.userHandle,
      profileId: newProfile.id,
    });
    const onwMonth = 30 * 24 * 60 * 60 * 1000;

    cookies().set({
      name: "token",
      value: token,
      httpOnly: true,
      expires: Date.now() + onwMonth,
    });

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
}
