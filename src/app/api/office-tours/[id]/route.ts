import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import OfficeTour from '@/models/OfficeTour';
import imagekit from '@/lib/imagekit'; // ✅ Import ImageKit instance
import { Buffer } from 'buffer';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// ✅ Preflight support for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// ✅ PUT handler with ImageKit
export async function PUT(req: NextRequest): Promise<NextResponse> {
  await connectToDatabase();

  const id = req.nextUrl.pathname.split('/').pop(); // Extract ID from URL

  try {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const text = formData.get('text') as string;
    const file = formData.get('image') as File | null;

    if (!title || !text) {
      return NextResponse.json(
        { success: false, message: 'Title and text are required' },
        { status: 400, headers: corsHeaders }
      );
    }

    let image = '';
    if (file && file.name) {
      // ✅ Convert file to Buffer
      const buffer = Buffer.from(await file.arrayBuffer());

      // ✅ Upload to ImageKit
      const uploadResponse = await imagekit.upload({
        file: buffer,
        fileName: file.name,
        folder: '/office-tours',
      });

      image = uploadResponse.url;
    }

    const updateData: any = { title, text };
    if (image) updateData.image = image;

    const updatedTour = await OfficeTour.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedTour) {
      return NextResponse.json(
        { success: false, message: 'Office tour not found' },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json({ success: true, data: updatedTour }, { headers: corsHeaders });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

// ✅ DELETE handler (unchanged)
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  await connectToDatabase();

  const id = req.nextUrl.pathname.split('/').pop(); // Extract ID from URL

  try {
    const deletedTour = await OfficeTour.findByIdAndDelete(id);

    if (!deletedTour) {
      return NextResponse.json(
        { success: false, message: 'Office tour not found' },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Deleted successfully' },
      { headers: corsHeaders }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}
