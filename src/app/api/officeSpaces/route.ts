import { NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import testConnection from "@/lib/db";
import officeSpaces from "@/models/officeSpaces";
import { existsSync } from "fs";

export async function POST(req: Request) {
  await testConnection();

  try {
    const formData = await req.formData();

    // Extract fields
    const officeSpaceName = formData.get("officeSpaceName") as string;
    const address = formData.get("address") as string;
    const description = formData.get("description") as string;
    const rate = formData.get("rate") as string;
    const amenities = formData.get("amenities") as string | null;
    const isNewlyOpen = formData.get("isNewlyOpen") === "true";

    if (!officeSpaceName || !address || !description || !rate) {
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

      console.log(`Saving file: ${filePath}`);
      await writeFile(filePath, buffer);
      imageUrl = `/uploads/${file.name}`;
    }

    // Save to database
    const newOfficeSpace = await officeSpaces.create({
      officeSpaceName,
      address,
      description,
      rate: parseFloat(rate),
      amenities: amenities ? amenities.split(",") : [],
      isNewlyOpen,
      image: imageUrl,
    });

    return NextResponse.json({ success: true, data: newOfficeSpace }, { status: 201 });
  } catch (error: any) {
    console.error("Error:", error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
