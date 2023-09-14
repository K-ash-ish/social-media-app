import { prisma } from "@/lib/db";
import { verify } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { postId } = await req.json();
  const token = cookies().get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Not Authorised" }, { status: 400 });
  }
  const isTokenVerified = await verify(token);
  if (!isTokenVerified) {
    return NextResponse.json({ message: "Not Authorised" }, { status: 400 });
  }
  console.log("postid: ", postId);
  console.log(isTokenVerified);

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
    const removeLike = await prisma.like.delete({
      where: {
        id: isAlreadyLiked.id,
      },
    });
    return NextResponse.json(
      { message: "Like removed", isLiked: false },
      { status: 200 }
    );
  }

  try {
    const newLike = await prisma.like.create({
      data: {
        postId: Number(postId),
        authorId: isTokenVerified?.payload?.profileId,
      },
    });
    console.log(newLike);
    return NextResponse.json(
      { message: "Like added", isLiked: true },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Something Went wrong" });
  }
}
