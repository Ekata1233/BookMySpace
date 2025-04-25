import { connectToDatabase } from "@/lib/db";
import OfficeTour from "@/models/OfficeTour";
import { NextResponse } from "next/server";
import imagekit from "@/lib/imagekit"; // ✅ ImageKit instance
import { Buffer } from "buffer";

// ✅ CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ✅ OPTIONS
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// ✅ GET
export async function GET() {
  await connectToDatabase();
  try {
    const tours = await OfficeTour.find({});
    return NextResponse.json(
      { success: true, data: tours },
      { status: 200, headers: corsHeaders },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500, headers: corsHeaders },
    );
  }
}

// ✅ POST (with ImageKit upload)
export async function POST(req: Request) {
  await connectToDatabase();
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const file = formData.get("image") as File;

    if (!title || !description || !file) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400, headers: corsHeaders },
      );
    }

    // ✅ Convert file to Buffer for ImageKit upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ✅ Upload to ImageKit
    const uploadResponse = await imagekit.upload({
      file: buffer,
      fileName: file.name,
      folder: "/office-tours",
    });

    // ✅ Save to DB with uploaded URL
    const newTour = await OfficeTour.create({
      title,
      description,
      image: uploadResponse.url,
    });

    return NextResponse.json(
      { success: true, data: newTour },
      { status: 201, headers: corsHeaders },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500, headers: corsHeaders },
    );
  }
}
