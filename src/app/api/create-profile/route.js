import { prisma } from "@/lib/db";
import { verify } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const formRes = await req.json();
  const token = cookies().get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authorised" }, { status: 401 });
  }
  const isTokenverified = await verify(token);
  //   console.log(isTokenverified);
  if (!isTokenverified) {
    return NextResponse.json({ error: "Not authorised" }, { status: 400 });
  }
  return NextResponse.json("Profile created");
}
