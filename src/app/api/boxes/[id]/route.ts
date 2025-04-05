// app/api/boxes/[id]/route.ts
import { NextResponse } from "next/server";
import Box from "@/models/box";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const updateData = await request.json();
    
    const updatedBox = await Box.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json({ success: true, data: updatedBox });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    await Box.findByIdAndUpdate(id, { isDeleted: true });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}