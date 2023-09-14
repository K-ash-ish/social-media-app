import { prisma } from "@/lib/db";
import { verify } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { profileData } = await req.json();
  const token = cookies().get("token")?.value;
  const isTokenVerified = await verify(token);
  if (!isTokenVerified) {
    return NextResponse.json("not authorised");
  }
  const isAlreadyFollowing = await prisma.follow.findFirst({
    where: {
      AND: [
        {
          followingId: {
            equals: profileData.id,
          },
        },
        {
          currentUserId: {
            equals: isTokenVerified?.payload?.profileId,
          },
        },
      ],
    },
  });
  console.log("isAlreadyFollowing: ", isAlreadyFollowing);
  if (isAlreadyFollowing) {
    await prisma.follow.delete({
      where: {
        id: isAlreadyFollowing?.id,
      },
    });
    return NextResponse.json("Unfollowed");
  }
  const newFollower = await prisma.follow.create({
    data: {
      followingId: profileData?.id,
      currentUserId: isTokenVerified?.payload?.profileId,
    },
  });

  return NextResponse.json(
    { message: "Followed", data: newFollower },
    { status: 200 }
  );
}
