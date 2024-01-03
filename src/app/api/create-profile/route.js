import { prisma } from "@/lib/db";
import { sign, verify } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const profileDetails = await req.json();
  const accessToken = cookies().get("accessToken")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authorised" }, { status: 401 });
  }
  const isTokenverified = await verify(accessToken);
  if (!isTokenverified) {
    return NextResponse.json({ error: "Not authorised" }, { status: 400 });
  }
  try {
    const newProfile = await prisma.profile.create({
      data: {
        bio: profileDetails?.bio,
        name: profileDetails?.name,
        userHandle: profileDetails?.userHandle,
        pictureUrl: profileDetails?.pictureUrl,
        userId: isTokenverified.payload.id,
      },
    });

    const accessToken = await sign({
      accessLevel: "user",
      email: isTokenverified?.payload?.email,
      id: isTokenverified?.payload?.id,
      userHandle: profileDetails?.userHandle,
      profileId: newProfile.id,
    });

    cookies().set({
      name: "accessToken",
      value: accessToken,
      httpOnly: true,
      expires: Date.now() + 15 * 60 * 1000,
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
