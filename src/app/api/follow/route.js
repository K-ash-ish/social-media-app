import { prisma } from "@/lib/db";
import { verify } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { userData } = await req.json();
  const token = cookies().get("token")?.value;
  const isTokenVerified = await verify(token);
  console.log(isTokenVerified + " current user");
  console.log(userData, " searched user");
  if (!isTokenVerified) {
    return NextResponse.json("not authorised");
  }
  const checkFollow = await prisma.follow.findFirst({
    where: {
      AND: [
        {
          followingId: {
            equals: isTokenVerified?.payload?.profileId,
          },
        },
        {
          followerId: {
            equals: userData?.id,
          },
        },
      ],
    },
  });
  console.log(checkFollow);
  if (checkFollow) {
    await prisma.follow.delete({
      where: {
        id: checkFollow?.id,
      },
    });
    return NextResponse.json("Unfollowed");
  }
  await prisma.follow.create({
    data: {
      followingId: isTokenVerified?.payload?.profileId,
      followerId: userData?.id,
      updatedAt: new Date(),
    },
  });

  // console.log(newFollower);
  return NextResponse.json("Followed");
}
