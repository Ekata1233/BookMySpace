import { NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import testConnection from "@/lib/db";
import officeSpaces from "@/models/officeSpaces";
import { existsSync } from "fs";
// Connect to MongoDB
testConnection();

export async function POST(req: Request) {
  await testConnection();

  try {
    const formData = await req.formData();

    const officeSpaceName = formData.get("officeSpaceName") as string;
    const address = formData.get("address") as string;
    const description = formData.get("description") as string;
    const rate = Number(formData.get("rate"));
    const isNewlyOpen = formData.get("isNewlyOpen") === "true";
    const category = formData.get("category") as string;
    const amenities = JSON.parse(formData.get("amenities") as string);

    if (!officeSpaceName || !address || !description || isNaN(rate)) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Ensure 'public/uploads' directory exists
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!existsSync(uploadDir)) {
      console.log("Creating uploads directory...");
      await mkdir(uploadDir, { recursive: true });
    }

    // Handle file upload
    let imageUrl = "";
    const file = formData.get("image") as File | null;

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filePath = path.join(uploadDir, file.name);

      await writeFile(filePath, buffer);
      imageUrl = `/uploads/${file.name}`;
    }

    // Create new office space entry in the database
    const newOfficeSpace = await officeSpaces.create({
      officeSpaceName,
      address,
      description,
      rate,
      isNewlyOpen,
      category,
      amenities,
      image: imageUrl, // Stores the uploaded image URL
    });

    return NextResponse.json(
      { success: true, data: newOfficeSpace },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    const newOfficeSpace = await officeSpaces.find({});
    return NextResponse.json(
      { success: true, data: newOfficeSpace },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error:", error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
