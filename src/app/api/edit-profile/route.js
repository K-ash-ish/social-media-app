import { prisma } from "@/lib/db";
import { verify } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const updatedData = await req.json();
  const accessToken = cookies().get("accessToken")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Not authorised" }, { status: 401 });
  }
  const isTokenverified = await verify(accessToken);
  if (!isTokenverified) {
    return NextResponse.json({ error: "Not authorised" }, { status: 400 });
  }
  const update = await prisma.profile.update({
    where: {
      id: isTokenverified?.payload?.profileId,
    },
    data: updatedData,
  });

  try {
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
}
