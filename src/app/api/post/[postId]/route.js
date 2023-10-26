import { prisma } from "@/lib/db";
import { verify } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  const { postId } = context.params;
  console.log(postId);
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
  // console.log(post);
  return NextResponse.json({ message: "success", post }, { status: 200 });
}
