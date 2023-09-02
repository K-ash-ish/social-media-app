import { NextResponse } from "next/server";
import { createSeed } from "../../../../seed/createUsers";

export async function GET() {
  createSeed();
  return NextResponse.json({ message: "Users Added to db" }, { status: 200 });
}
