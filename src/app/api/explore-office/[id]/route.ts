import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import ExploreOffice from '@/models/ExploreOffice';
import imagekit from '@/lib/imagekit';
import { Buffer } from 'buffer';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Preflight for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// ✅ PUT handler with ImageKit support
export async function PUT(req: NextRequest): Promise<NextResponse> {
  await connectToDatabase();
  const id = req.nextUrl.pathname.split('/').pop();

  try {
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const address = formData.get('address') as string;
    const file = formData.get('image') as File | null;

    if (!name || !address) {
      return NextResponse.json(
        { success: false, message: 'Name and address are required' },
        { status: 400, headers: corsHeaders }
      );
    }

    let image = '';
    if (file && typeof file === 'object' && file.name) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResponse = await imagekit.upload({
        file: buffer,
        fileName: file.name,
        folder: '/explore-offices',
      });

      image = uploadResponse.url;
    }

    const updateData: any = { name, address };
    if (image) updateData.image = image;

    const updatedOffice = await ExploreOffice.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedOffice) {
      return NextResponse.json(
        { success: false, message: 'Office not found' },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json({ success: true, data: updatedOffice }, { headers: corsHeaders });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

// ✅ DELETE handler
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  await connectToDatabase();
  const id = req.nextUrl.pathname.split('/').pop();

  try {
    const deletedOffice = await ExploreOffice.findByIdAndDelete(id);

    if (!deletedOffice) {
      return NextResponse.json(
        { success: false, message: 'Office not found' },
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
