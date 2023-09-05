import { prisma } from "@/lib/db";
import { verify } from "@/lib/jwt";
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

  const newProfile = await prisma.profile.create({
    data: {
      bio: profileDetails?.bio,
      name: profileDetails?.name,
      userHandle: profileDetails?.userHandle,
      profilePic: profileDetails?.profilePic,
      userId: isTokenverified.payload.id,
    },
  });
  console.log("newProfile ", newProfile);
  return NextResponse.json({ message: "success" }, { status: 200 });
}
