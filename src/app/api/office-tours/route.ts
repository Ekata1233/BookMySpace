import { NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { connectToDatabase } from "@/lib/db";
import OfficeTour from "@/models/OfficeTour";

// Ensure MongoDB is connected
connectToDatabase();

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const text = formData.get("text") as string;
    const file = formData.get("image") as File;

    if (!title || !text || !file) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Upload directory setup
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(uploadDir, file.name);
    await writeFile(filePath, buffer);

    const imageUrl = `/uploads/${file.name}`;

    const newTour = await OfficeTour.create({ title, text, image: imageUrl });

    return NextResponse.json({ success: true, data: newTour }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const tours = await OfficeTour.find();
    return NextResponse.json({ success: true, data: tours }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
