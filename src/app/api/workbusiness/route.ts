import { NextRequest, NextResponse } from "next/server";
import WorkBusiness from "@/models/WorkBusiness";
import imagekit from "@/lib/imagekit";
import { connectToDatabase } from "@/lib/db";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ✅ Preflight request support
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// ✅ POST - Create WorkBusiness entry
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description1 = formData.get("description1") as string;
    const description2 = formData.get("description2") as string;
    const imageTopFile = formData.get("imageTop") as File;
    const imageBottomFile = formData.get("imageBottom") as File;

    if (!title || !description1 || !description2 || !imageTopFile || !imageBottomFile) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const bufferTop = Buffer.from(await imageTopFile.arrayBuffer());
    const bufferBottom = Buffer.from(await imageBottomFile.arrayBuffer());

    const uploadedTop = await imagekit.upload({
      file: bufferTop,
      fileName: "workBusiness_top.jpg",
      folder: "/work-business",
    });

    const uploadedBottom = await imagekit.upload({
      file: bufferBottom,
      fileName: "workBusiness_bottom.jpg",
      folder: "/work-business",
    });

    const newEntry = await WorkBusiness.create({
      title,
      description1,
      description2,
      imageTop: uploadedTop.url,
      imageBottom: uploadedBottom.url,
    });

    return NextResponse.json(newEntry, { status: 201, headers: corsHeaders });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// ✅ GET - Fetch all WorkBusiness entries
export async function GET() {
  try {
    await connectToDatabase();
    const data = await WorkBusiness.find().sort({ createdAt: -1 });
    return NextResponse.json(data, { status: 200, headers: corsHeaders });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch" },
      { status: 500, headers: corsHeaders }
    );
  }
}
