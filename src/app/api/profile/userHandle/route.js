import { prisma } from "@/lib/db";
import { verify } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();
  const token = cookies().get("token")?.value;
  const isTokenVerified = await verify(token);
  if (isTokenVerified?.payload?.userHandle === data.userHandle) {
    return NextResponse.json({ message: "redirect user" }, { status: 200 });
  }
  const userProfile = await prisma.profile.findFirst({
    where: {
      userHandle: {
        equals: data.userHandle,
      },
    },
    include: {
      posts: true,
    },
  });
  // searched user id userProfile.id
  // current user profileid
  if (userProfile) {
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
              equals: userProfile.id,
            },
          },
        ],
      },
    });
    if (checkFollow) {
      userProfile.following = true;
      // if (isTokenVerified && isTokenVerified?.payload?.id === userProfile.userId) {
      //   console.log("asdf");
      //   return NextResponse.json({
      //     message: "redirect user",
      //     userData: userProfile,
      //   });
      // }
      return NextResponse.json(
        { message: { ...userProfile, ...checkFollow } },
        { status: 200 }
      );
    }
  }
  return NextResponse.json({ message: "Not found" }, { status: 200 });
}
