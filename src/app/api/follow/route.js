import { prisma } from "@/lib/db";
import { verify } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userData } = await req.json();
  const token = cookies().get("token")?.value;
  const isTokenVerified = await verify(token);
  console.log(isTokenVerified + " current user");
  // console.log(userData, " searched user");
  if (!isTokenVerified) {
    return NextResponse.json("not authorised");
  }
  const isAlreadyFollowing = await prisma.follow.findFirst({
    where: {
      AND: [
        {
          followingId: {
            equals: userData.id,
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
  console.log(isAlreadyFollowing);

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
      followingId: userData?.id,
      currentUserId: isTokenVerified?.payload?.profileId,
    },
  });

  console.log(newFollower);
  return NextResponse.json("Followed");
}
