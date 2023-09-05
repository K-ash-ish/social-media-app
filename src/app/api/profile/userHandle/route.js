import { prisma } from "@/lib/db";
import { verify } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();
  const token = cookies().get("token")?.value;
  const isTokenVerified = await verify(token);
  if (isTokenVerified?.payload?.userHandle === data.userHandle) {
    return NextResponse.json({ message: "redirect user" }, { status: 200 });
  }
  const userProfile = await prisma.profile.findFirst({
    where: {
      userHandle: {
        equals: data.userHandle,
      },
    },
    include: {
      posts: true,
    },
  });
  // if (isTokenVerified && isTokenVerified?.payload?.id === userProfile.userId) {
  //   console.log("asdf");
  //   return NextResponse.json({
  //     message: "redirect user",
  //     userData: userProfile,
  //   });
  // }
  return NextResponse.json({ message: userProfile }, { status: 200 });
}
