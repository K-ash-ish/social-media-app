import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");

  return NextResponse.json({ message: "Success" }, { status: 200 });
}
