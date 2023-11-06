import { prismaAccelerate } from "@/lib/db";
import { sign } from "@/lib/jwt";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { id } = await req.json();
  const currentUser = await prismaAccelerate.user.findUnique({
    where: {
      id: id,
    },

    select: {
      email: true,
      profile: {
        select: {
          id: true,
          userHandle: true,
        },
      },
    },
  });

  const newAccessToken = await sign({
    accessLevel: "user",
    email: currentUser?.email,
    id: id,
    userHandle: currentUser?.profile?.userHandle,
    profileId: currentUser?.profile?.id,
    refreshed: true,
  });

  return NextResponse.json({ newAccessToken });
}
