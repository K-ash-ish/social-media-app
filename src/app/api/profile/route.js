import { prisma } from "@/lib/db";
import { verify } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token = cookies().get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Not Authorised" }, { status: 400 });
  }
  const isTokenVerified = await verify(token);
  if (!isTokenVerified) {
    return NextResponse.json({ message: "Not Authorised" }, { status: 400 });
  }
  if (!isTokenVerified.payload.profileId) {
    return NextResponse.json({ message: "Profile not found" }, { status: 400 });
  }
  const userProfile = await prisma.profile.findFirst({
    where: {
      id: {
        equals: isTokenVerified.payload.profileId,
      },
    },
    include: {
      user: true,
      posts: {
        orderBy: {
          createdAt: "desc", // Order posts by the 'createdAt' field in descending order
        },
      },
    },
  });
  console.log(userProfile);
  return NextResponse.json({ message: userProfile }, { status: 200 });
}
