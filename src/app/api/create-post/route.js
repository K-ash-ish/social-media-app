import { prisma } from "@/lib/db";
import { verify } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const reqJson = await req.json();
  const currentUser = cookies().get("token")?.value;
  const isValidUser = await verify(currentUser);
  if (isValidUser) {
    const newPost = await prisma.post.create({
      data: {
        authorId: isValidUser.payload.profileId,
        published: true,
        title: reqJson.title,
        content: reqJson.content,
      },
    });
    return NextResponse.json(newPost);
  }
  return NextResponse.json({ error: "Something went wrong" }, { status: 400 });
}
