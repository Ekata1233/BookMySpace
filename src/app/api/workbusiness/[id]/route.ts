import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import WorkBusiness from '@/models/WorkBusiness';
import imagekit from '@/lib/imagekit';
import { Buffer } from 'buffer';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// ✅ Preflight CORS support
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// ✅ PUT: Update WorkBusiness
export async function PUT(req: NextRequest): Promise<NextResponse> {
  await connectToDatabase();

  const id = req.nextUrl.pathname.split('/').pop();

  try {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const description1 = formData.get('description1') as string;
    const description2 = formData.get('description2') as string;
    const imageTopFile = formData.get('imageTop') as File | null;
    const imageBottomFile = formData.get('imageBottom') as File | null;

    if (!title || !description1 || !description2) {
      return NextResponse.json(
        { success: false, message: 'All text fields are required' },
        { status: 400, headers: corsHeaders }
      );
    }

    const updateData: any = {
      title,
      description1,
      description2,
    };

    if (imageTopFile && typeof imageTopFile === 'object' && imageTopFile.name) {
      const bufferTop = Buffer.from(await imageTopFile.arrayBuffer());
      const uploadTop = await imagekit.upload({
        file: bufferTop,
        fileName: imageTopFile.name,
        folder: '/work-business',
      });
      updateData.imageTop = uploadTop.url;
    }

    if (imageBottomFile && typeof imageBottomFile === 'object' && imageBottomFile.name) {
      const bufferBottom = Buffer.from(await imageBottomFile.arrayBuffer());
      const uploadBottom = await imagekit.upload({
        file: bufferBottom,
        fileName: imageBottomFile.name,
        folder: '/work-business',
      });
      updateData.imageBottom = uploadBottom.url;
    }

    const updated = await WorkBusiness.findByIdAndUpdate(id, updateData, { new: true });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'WorkBusiness not found' },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json({ success: true, data: updated }, { headers: corsHeaders });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Update failed' },
      { status: 500, headers: corsHeaders }
    );
  }
}

// ✅ DELETE: Remove WorkBusiness
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  await connectToDatabase();

  const id = req.nextUrl.pathname.split('/').pop();

  try {
    const deleted = await WorkBusiness.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: 'WorkBusiness not found' },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Deleted successfully' },
      { headers: corsHeaders }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Delete failed' },
      { status: 500, headers: corsHeaders }
    );
  }
}
