import { NextResponse } from "next/server";
import WorkBusiness from "@/models/WorkBusiness";
import imagekit from "@/lib/imagekit";
import { connectToDatabase } from "@/lib/db";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description1 = formData.get("description1") as string;
    const description2 = formData.get("description2") as string;
    const imageTopFile = formData.get("imageTop") as File;
    const imageBottomFile = formData.get("imageBottom") as File;

    const bufferTop = Buffer.from(await imageTopFile.arrayBuffer());
    const bufferBottom = Buffer.from(await imageBottomFile.arrayBuffer());

    const uploadedTop = await imagekit.upload({
      file: bufferTop,
      fileName: "workBusiness_top.jpg",
    });

    const uploadedBottom = await imagekit.upload({
      file: bufferBottom,
      fileName: "workBusiness_bottom.jpg",
    });

    const newEntry = await WorkBusiness.create({
      title,
      description1,
      description2,
      imageTop: uploadedTop.url,
      imageBottom: uploadedBottom.url,
    });

    return NextResponse.json(newEntry, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const data = await WorkBusiness.find().sort({ createdAt: -1 });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
