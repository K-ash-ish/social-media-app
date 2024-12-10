import { prisma } from "@/lib/db";
import { verify } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { title, content } = await req.json();
  const accessToken = cookies().get("accessToken")?.value;
  if (!accessToken) {
    return NextResponse.json({ message: "Not Authorised" }, { status: 400 });
  }
  const isTokenVerified = await verify(accessToken);
  if (!isTokenVerified) {
    return NextResponse.json({ message: "Not Authorised" }, { status: 400 });
  }
  const profileId = isTokenVerified.payload.profileId;
  const newPost = await prisma.post.create({
    data: {
      authorId: profileId,
      published: true,
      title: title,
      content: content,
    },
  });
  return NextResponse.json(
    {
      message: "Success",
      data: newPost,
    },
    { status: 200 }
  );
}
