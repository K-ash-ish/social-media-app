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
  const post = await prisma.post.findUnique({
    where: {
      id: Number(postId),
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
  return NextResponse.json({ message: "success", data: post }, { status: 200 });
}
