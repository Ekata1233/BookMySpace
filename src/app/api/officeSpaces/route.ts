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
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const pincode = formData.get("pincode") as string;
    const description = formData.get("description") as string;
    const extraDescription = formData.get("extraDescription") as string;
    const rate = Number(formData.get("rate"));
    const isNewlyOpen = formData.get("isNewlyOpen") === "true";
    const category = formData.get("category") as string;
    const amenities = JSON.parse(formData.get("amenities") as string);
    const startTime = new Date(formData.get("startTime") as string);
    const endTime = new Date(formData.get("endTime") as string);

    if (!officeSpaceName || !city || !description || isNaN(rate)) {
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
    const file = formData.get("thumbnailImage") as File | null;

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filePath = path.join(uploadDir, file.name);

      await writeFile(filePath, buffer);
      imageUrl = `/uploads/${file.name}`;
    }

    const multiImages: string[] = [];
    const files = formData.getAll("multiImages") as File[];

    for (const file of files) {
      if (file instanceof File) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filePath = path.join(uploadDir, file.name);

        await writeFile(filePath, buffer);
        multiImages.push(`/uploads/${file.name}`);
      }
    }

    // Create new office space entry in the database
    const newOfficeSpace = await officeSpaces.create({
      officeSpaceName,
      city,
      state,
      pincode,
      description,
      extraDescription,
      rate,
      startTime,
      endTime,
      isNewlyOpen,
      category,
      amenities,
      thumbnailImage: imageUrl,
      multiImages,
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
