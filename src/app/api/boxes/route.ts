import { NextResponse } from "next/server";
import testConnection from "@/lib/db";
import Box from "@/models/box";

testConnection();

export async function GET() {
  try {
    const boxes = await Box.find({ isDeleted: false }); // Only fetch non-deleted boxes
    return NextResponse.json({ success: true, data: boxes }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { icon, link, text, description } = await req.json();

    if (!icon || !link || !text || !description) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }

    const newBox = await Box.create({ icon, link, text, description });
    return NextResponse.json({ success: true, data: newBox }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    const { _id, ...updateData } = await req.json();

    if (!_id) {
      return NextResponse.json({ success: false, message: "Box ID is required" }, { status: 400 });
    }

    const updatedBox = await Box.findByIdAndUpdate(
      _id,
      updateData,
      { new: true } // Return the updated document
    );

    if (!updatedBox) {
      return NextResponse.json({ success: false, message: "Box not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedBox }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { _id } = await req.json();

    if (!_id) {
      return NextResponse.json({ success: false, message: "Box ID is required" }, { status: 400 });
    }

    // Soft delete (set isDeleted to true)
    const deletedBox = await Box.findByIdAndUpdate(
      _id,
      { isDeleted: true },
      { new: true }
    );

    if (!deletedBox) {
      return NextResponse.json({ success: false, message: "Box not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: deletedBox }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}