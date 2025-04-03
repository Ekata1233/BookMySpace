import { NextResponse } from "next/server";
import testConnection from "@/lib/db";
import Box from "@/models/box";

testConnection();

export async function GET() {
  try {
    const boxes = await Box.find({});
    return NextResponse.json({ success: true, data: boxes }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await testConnection();

  try {
    const { icon, link, text, description } = await req.json();

    if (!icon || !link || !text || !description) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const newBox = await Box.create({ icon, link, text, description });

    return NextResponse.json({ success: true, data: newBox }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
