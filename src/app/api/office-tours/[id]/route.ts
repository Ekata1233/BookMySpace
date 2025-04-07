import { connectToDatabase } from '@/lib/db';
import OfficeTour from '@/models/OfficeTour';
import path from 'path';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { NextRequest, NextResponse } from 'next/server';

const uploadDir = path.join(process.cwd(), 'public/uploads');

// ✅ MUST use `context` — not destructuring
export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  await connectToDatabase();
  const { id } = context.params;

  try {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const text = formData.get('text') as string;
    const file = formData.get('image') as File | null;

    if (!title || !text) {
      return NextResponse.json({ success: false, message: 'Title and text are required' }, { status: 400 });
    }

    let image = '';
    if (file && file.name) {
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const filePath = path.join(uploadDir, file.name);
      await writeFile(filePath, buffer);
      image = `/uploads/${file.name}`;
    }

    const updateData: any = { title, text };
    if (image) updateData.image = image;

    const updated = await OfficeTour.findByIdAndUpdate(id, updateData, { new: true });

    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

// ✅ MUST use `context` — not destructuring
export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  await connectToDatabase();
  const { id } = context.params;

  try {
    const deletedTour = await OfficeTour.findByIdAndDelete(id);

    if (!deletedTour) {
      return NextResponse.json({ success: false, message: "Office tour not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
