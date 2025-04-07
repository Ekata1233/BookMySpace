import { NextResponse } from 'next/server';
import Box from '@/models/box';
import { connectToDatabase } from '../../../../lib/db';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// ✅ Handle preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// ✅ PUT - Update Box
export async function PUT(request: Request, context: any) {
  await connectToDatabase();

  try {
    const { id } = context.params;
    const updateData = await request.json();

    const updatedBox = await Box.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedBox) {
      return NextResponse.json(
        { success: false, message: 'Box not found' },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedBox },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400, headers: corsHeaders }
    );
  }
}

// ✅ DELETE - Soft Delete Box
export async function DELETE(request: Request, context: any) {
  await connectToDatabase();

  try {
    const { id } = context.params;

    const deletedBox = await Box.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );

    if (!deletedBox) {
      return NextResponse.json(
        { success: false, message: 'Box not found' },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { success: true, data: deletedBox },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400, headers: corsHeaders }
    );
  }
}
