import { NextResponse, NextRequest } from "next/server";
import testConnection from "@/lib/db";
import Box from "@/models/box";

testConnection();

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// ✅ Handle preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  try {
    const boxes = await Box.find({ isDeleted: false });
    return NextResponse.json(
      { success: true, data: boxes },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { icon, link, text, description } = await req.json();

    if (!icon || !link || !text || !description) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400, headers: corsHeaders }
      );
    }

    const newBox = await Box.create({ icon, link, text, description });

    return NextResponse.json(
      { success: true, data: newBox },
      { status: 201, headers: corsHeaders }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400, headers: corsHeaders }
    );
  }
}
