import { prisma } from "@/lib/db";
import { verify } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const accessToken = cookies().get("accessToken")?.value;
  if (!accessToken) {
    return NextResponse.json({ message: "Not Authorised" }, { status: 400 });
  }
  const isTokenVerified = await verify(accessToken);
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
      currentUsers: true,
      following: true,
    },
  });
  return NextResponse.json(
    { message: "Profile fetched successfully", data: userProfile },
    { status: 200 }
  );
}
