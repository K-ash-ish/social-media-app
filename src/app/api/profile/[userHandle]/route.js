import { prisma } from "@/lib/db";
import { verify } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  const { userHandle } = context.params;
  const accessToken = cookies().get("accessToken")?.value;
  const isTokenVerified = await verify(accessToken);
  if (isTokenVerified?.payload?.userHandle === userHandle) {
    return NextResponse.json({ message: "redirect user" }, { status: 200 });
  }
  const userProfile = await prisma.profile.findFirst({
    where: {
      userHandle: {
        equals: userHandle,
      },
    },
    include: {
      posts: true,
      currentUsers: {
        select: {
          currentUser: {
            select: {
              id: true,
              bio: true,
              // include any other fields from the Profile model that you want
            },
          },
        },
      },
      following: true,
    },
  });
  // searched user id userProfile.id
  // current user profileid
  if (userProfile) {
    const isAlreadyFollowing = await prisma.follow.findFirst({
      where: {
        AND: [
          {
            followingId: {
              equals: userProfile.id,
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

    if (isAlreadyFollowing) {
      return NextResponse.json(
        { message: { ...userProfile, isFollowing: true } },
        { status: 200 }
      );
    }
    return NextResponse.json({ message: userProfile }, { status: 200 });
  }
  return NextResponse.json({ message: "Not found" }, { status: 200 });
}
