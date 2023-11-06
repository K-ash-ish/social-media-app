import { prisma } from "@/lib/db";
import { verify } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  const { postId } = context.params;
  const accessToken = cookies().get("accessToken")?.value;
  if (!accessToken) {
    return NextResponse.json({ message: "Not Authorised" }, { status: 400 });
  }
  const isTokenVerified = await verify(accessToken);
  if (!isTokenVerified) {
    return NextResponse.json({ message: "Not Authorised" }, { status: 400 });
  }

  const likes = await prisma.like.findMany({
    where: {
      postId: {
        equals: Number(postId),
      },
    },
  });

  const isAlreadyLiked = await prisma.like.findFirst({
    where: {
      AND: [
        {
          postId: {
            equals: Number(postId),
          },
        },
        {
          authorId: {
            equals: isTokenVerified?.payload?.profileId,
          },
        },
      ],
    },
  });
  if (isAlreadyLiked) {
    return NextResponse.json(
      { message: likes, isLiked: true },
      { status: 200 }
    );
  }
  return NextResponse.json({ message: likes, isLiked: false });
}
