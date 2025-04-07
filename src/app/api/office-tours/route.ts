import { connectToDatabase } from '@/lib/db';
import OfficeTour from '@/models/OfficeTour';
import { NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// ✅ Handle preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// ✅ GET all office tours (excluding deleted ones)
export async function GET() {
  await connectToDatabase();
  try {
    const tours = await OfficeTour.find({ isDeleted: false });
    return NextResponse.json(
      { success: true, data: tours },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

// ✅ POST a new office tour
export async function POST(req: Request) {
  await connectToDatabase();
  try {
    const { image, title, description } = await req.json();

    if (!image || !title || !description) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400, headers: corsHeaders }
      );
    }

    const newTour = await OfficeTour.create({
      image,
      title,
      description,
      isDeleted: false,
    });

    return NextResponse.json(
      { success: true, data: newTour },
      { status: 201, headers: corsHeaders }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400, headers: corsHeaders }
    );
  }
}
