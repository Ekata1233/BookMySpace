import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Booking from "@/models/Booking";

export async function POST(req: Request) {
  await connectToDatabase();

  try {
    const { userId, officeId, date, startTime, duration, totalPay } = await req.json();

    const newBooking = new Booking({
      userId,
      officeId,
      date,
      startTime,
      duration,
      totalPay,
    });

    await newBooking.save();

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    console.error("Booking Create API Error:", error);
    return NextResponse.json({ message: "Error creating booking" }, { status: 500 });
  }
}
