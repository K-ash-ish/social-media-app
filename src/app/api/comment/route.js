import { prisma } from "@/lib/db";
import { verify } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { postId, content } = await req.json();
  const token = cookies().get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Not Authorised" }, { status: 400 });
  }
  const isTokenVerified = await verify(token);
  if (!isTokenVerified) {
    return NextResponse.json({ message: "Not Authorised" }, { status: 400 });
  }
  const profileId = isTokenVerified.payload.profileId;
  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: profileId,
      },
    });
    return NextResponse.json({ message: newComment }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 400 }
    );
  }
}
