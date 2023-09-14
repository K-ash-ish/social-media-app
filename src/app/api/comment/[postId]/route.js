import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  const { postId } = context.params;

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
    console.log(comments);
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
