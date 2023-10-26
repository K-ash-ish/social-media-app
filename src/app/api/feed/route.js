import { prisma } from "@/lib/db";
import { verify } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const accessToken = cookies().get("accessToken")?.value;
  if (!accessToken) {
    return NextResponse.json({ message: "Not Authorised" }, { status: 400 });
  }
  const isTokenVerified = await verify(accessToken);
  if (!isTokenVerified) {
    return NextResponse.json({ message: "Not Authorised" }, { status: 400 });
  }
  const currentUser = await prisma.profile.findUnique({
    where: { userId: isTokenVerified?.payload?.id },
    include: {
      currentUsers: true,
    },
  });

  const posts = await prisma.post.findMany({
    where: {
      author: {
        id: {
          in: currentUser.currentUsers?.map((item) => item.followingId),
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
  return NextResponse.json({ message: posts }, { status: 200 });
}
