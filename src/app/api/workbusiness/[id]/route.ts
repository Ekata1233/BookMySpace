import { NextResponse } from "next/server";
import WorkBusiness from "@/models/WorkBusiness";
import { connectToDatabase } from "@/lib/db";
import imagekit from "@/lib/imagekit";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();

    const formData = await req.formData();
    const { id } = params;
    const title = formData.get("title") as string;
    const description1 = formData.get("description1") as string;
    const description2 = formData.get("description2") as string;
    const imageTopFile = formData.get("imageTop") as File | null;
    const imageBottomFile = formData.get("imageBottom") as File | null;

    const updateData: any = { title, description1, description2 };

    if (imageTopFile && typeof imageTopFile !== "string") {
      const bufferTop = Buffer.from(await imageTopFile.arrayBuffer());
      const uploadedTop = await imagekit.upload({
        file: bufferTop,
        fileName: "workBusiness_top_updated.jpg",
      });
      updateData.imageTop = uploadedTop.url;
    }

    if (imageBottomFile && typeof imageBottomFile !== "string") {
      const bufferBottom = Buffer.from(await imageBottomFile.arrayBuffer());
      const uploadedBottom = await imagekit.upload({
        file: bufferBottom,
        fileName: "workBusiness_bottom_updated.jpg",
      });
      updateData.imageBottom = uploadedBottom.url;
    }

    const updated = await WorkBusiness.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const deleted = await WorkBusiness.findByIdAndDelete(params.id);
    return NextResponse.json(deleted, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
