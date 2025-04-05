// src/app/api/boxes/[id]/route.ts

import { NextResponse } from 'next/server';
import Box from '@/models/box';
import { connectToDatabase } from '../../../../lib/db';

// PUT - Update Box
export async function PUT(request: Request, context: any) {
  await connectToDatabase();

  try {
    const { id } = context.params;
    const updateData = await request.json();

    const updatedBox = await Box.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedBox) {
      return NextResponse.json(
        { success: false, message: 'Box not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedBox });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}

// DELETE - Soft Delete Box
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
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: deletedBox });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
