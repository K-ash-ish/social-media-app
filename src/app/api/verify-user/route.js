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
  const { name, userHandle, profileId, id } = isTokenVerified.payload;

  return NextResponse.json(
    { message: "Success", data: { name, userHandle, profileId, id } },
    { status: 200 }
  );
}
