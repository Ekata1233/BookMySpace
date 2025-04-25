import { NextResponse } from "next/server";
import testConnection from "@/lib/db";
import BookSpace from "@/models/bookSpace";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
// GET: Fetch all bookings
export async function GET() {
  await testConnection();
  try {
    const bookings = await BookSpace.find({});
    return NextResponse.json(
      { success: true, data: bookings },
      { status: 200, headers: corsHeaders },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500, headers: corsHeaders },
    );
  }
}

// POST: Create a new booking
export async function POST(req: Request) {
  await testConnection();

  try {
    const body = await req.json();
    const { userId, officeId, date, startTime, duration, totalPay } = body;

    // Validate required fields
    if (!userId || !officeId || !date || !startTime || !duration || !totalPay) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    // Create booking document
    const newBooking = await BookSpace.create({
      userId,
      officeId,
      date,
      startTime,
      duration,
      totalPay,
    });

    return NextResponse.json(
      { success: true, data: newBooking },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 },
    );
  }
}
