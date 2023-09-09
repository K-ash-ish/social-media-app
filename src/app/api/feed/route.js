import { prisma } from "@/lib/db";
import { verify } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token = cookies().get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Not Authorised" }, { status: 400 });
  }
  const isTokenVerified = await verify(token);
  if (!isTokenVerified) {
    return NextResponse.json({ message: "Not Authorised" }, { status: 400 });
  }
  const followingProfiles = await prisma.profile.findUnique({
    where: { userId: isTokenVerified?.payload?.id },
    include: {
      following: {
        select: {
          followerId: true,
        },
      },
    },
  });

  console.log(followingProfiles);
  const posts = await prisma.post.findMany({
    where: {
      author: {
        id: {
          in: followingProfiles?.following?.map((item) => item.followerId),
        },
      },
    },
    // Include any other fields that you want from the Post model
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      author: {
        select: {
          name: true,
          userHandle: true,
        },
      },
    },
  });
  console.log(posts);
  return NextResponse.json({ message: posts }, { status: 200 });
}
