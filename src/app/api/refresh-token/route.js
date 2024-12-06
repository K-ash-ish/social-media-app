import { prismaAccelerate } from "@/lib/db";
import { sign } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { id } = await req.json();
  const currentUser = await prismaAccelerate.user.findUnique({
    where: {
      id: id,
    },

    select: {
      email: true,
      profile: true,
    },
  });

  const newAccessToken = await sign({
    accessLevel: "user",
    email: currentUser?.email,
    id: id,
    userHandle: currentUser?.profile?.userHandle,
    profileId: currentUser?.profile?.id,
    name: currentUser.profile.name,

    refreshed: true,
  });

  cookies().set({
    name: "accessToken",
    value: newAccessToken,
    httpOnly: true,
    expires: Date.now() + 15 * 60 * 1000,
  });

  return NextResponse.json({ newAccessToken });
}
