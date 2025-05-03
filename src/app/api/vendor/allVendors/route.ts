import { NextResponse } from "next/server";
import testConnection from "@/lib/db";
import vendor from "@/models/vendor";
import imagekit from "@/lib/imagekit"; // ✅ ImageKit instance
import { Buffer } from "buffer";

// Connect to database
testConnection();

// ✅ CORS Headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ✅ OPTIONS Handler (for CORS preflight)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// ✅ GET: Fetch all vendors without password
export async function GET() {
  try {
    const vendors = await vendor.find({}, "-password"); // Fetch vendors excluding password field
    return NextResponse.json(
      { success: true, data: vendors },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

// ✅ POST: Add new vendor with image upload to ImageKit
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const officeName = formData.get("officeName") as string;
    const category = formData.get("category") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const pincode = formData.get("pincode") as string;
    const description = formData.get("description") as string;
    const rate = formData.get("rate") as string;
    const file = formData.get("image") as File;

    if (
      !officeName ||
      !category ||
      !city ||
      !state ||
      !pincode ||
      !description ||
      !rate ||
      !file
    ) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    // ✅ Convert image file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ✅ Upload image to ImageKit
    const uploadResponse = await imagekit.upload({
      file: buffer,
      fileName: file.name,
      folder: "/vendors", // Optional: Set folder for vendor images
    });

    // ✅ Save vendor data to the database with image URL
    const newVendor = await vendor.create({
      officeName,
      category,
      city,
      state,
      pincode,
      description,
      rate,
      image: uploadResponse.url, // Store the ImageKit URL in the vendor model
      isAdminApprove: false, // Default approval state
    });

    return NextResponse.json(
      { success: true, data: newVendor },
      { status: 201, headers: corsHeaders }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}
