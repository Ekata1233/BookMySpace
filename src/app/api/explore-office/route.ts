import { connectToDatabase } from "@/lib/db";
import ExploreOffice from "@/models/ExploreOffice";
import { NextResponse } from "next/server";
import imagekit from "@/lib/imagekit";
import { Buffer } from "buffer";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ✅ Preflight support
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// ✅ GET all ExploreOffice entries
export async function GET() {
  await connectToDatabase();
  try {
    const offices = await ExploreOffice.find({});
    return NextResponse.json(
      { success: true, data: offices },
      { status: 200, headers: corsHeaders },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500, headers: corsHeaders },
    );
  }
}

// ✅ POST new ExploreOffice entry with ImageKit upload
export async function POST(req: Request) {
  await connectToDatabase();
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const file = formData.get("image") as File;

    if (!name || !address || !file) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400, headers: corsHeaders },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResponse = await imagekit.upload({
      file: buffer,
      fileName: file.name,
      folder: "/explore-offices",
    });

    const newOffice = await ExploreOffice.create({
      name,
      address,
      image: uploadResponse.url,
    });

    return NextResponse.json(
      { success: true, data: newOffice },
      { status: 201, headers: corsHeaders },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500, headers: corsHeaders },
    );
  }
}
