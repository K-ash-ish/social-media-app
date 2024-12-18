import { prisma } from "@/lib/db";
import { verify } from "@/lib/jwt";
import { pusherServer } from "@/lib/pusher";
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
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: {
          equals: Number(postId),
        },
      },
      include: {
        author: {
          select: {
            name: true,
            userHandle: true,
          },
        },
      },
    });
    return NextResponse.json(
      { message: "success", data: comments },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something Went wrong" },
      { status: 400 }
    );
  }
}
export async function POST(req) {
  const { postId, content } = await req.json();

  const accessToken = cookies().get("accessToken")?.value;
  if (!accessToken) {
    return NextResponse.json({ message: "Not Authorised" }, { status: 400 });
  }
  const isTokenVerified = await verify(accessToken);
  if (!isTokenVerified) {
    return NextResponse.json({ message: "Not Authorised" }, { status: 400 });
  }
  const profileId = isTokenVerified.payload.profileId;

  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        postId: Number(postId),
        authorId: profileId,
      },
      include: {
        author: {
          select: {
            name: true,
            userHandle: true,
          },
        },
      },
    });

    pusherServer.trigger(postId, "comment-updates", { newComment });

    return NextResponse.json(
      { message: "Comment Added successfully", data: newComment },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  }
}
