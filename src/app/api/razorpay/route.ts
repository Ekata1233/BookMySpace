import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import RazorpayBooking from "../../../models/Booking"; // Import RazorpayBooking model
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// POST method: Create a Razorpay order and save it in the database
export async function POST(req: Request) {
  await connectToDatabase();

  try {
    // Get the data from the request body
    const { userId, officeId, date, startTime, duration, totalPay } = await req.json();

    // Create Razorpay order
    const orderOptions = {
      amount: totalPay * 100, // Razorpay uses paise
      currency: "INR",
      receipt: `receipt_order_${Math.random()}`,
    };

    const razorpayOrder = await razorpay.orders.create(orderOptions);

    // Save only the Razorpay order ID in RazorpayBooking collection
    const newRazorpayBooking = new RazorpayBooking({
      userId,
      officeId,
      date,
      startTime,
      duration,
      totalPay,
      razorpayOrderId: razorpayOrder.id, // Save Razorpay order ID only
    });
    console.log("Booking saved:", newRazorpayBooking);
    await newRazorpayBooking.save();

    // Return the Razorpay order ID in the response
    return NextResponse.json({
      razorpayOrderId: razorpayOrder.id, // Only send order ID and totalPay
      totalPay: totalPay,
    }, { status: 201 });
  } catch (error) {
    console.error("Booking Create API Error:", error);
    return NextResponse.json({ message: "Error creating Razorpay order" }, { status: 500 });
  }
}

// GET method: Fetch all Razorpay booking details
export async function GET(req: Request) {
  await connectToDatabase();

  try {
    // Fetch all the bookings from RazorpayBooking collection
    const razorpayBookings = await RazorpayBooking.find();

    // Return all the booking details
    return NextResponse.json(razorpayBookings, { status: 200 });
  } catch (error) {
    console.error("Error fetching Razorpay booking:", error);
    return NextResponse.json({ message: "Error fetching booking details" }, { status: 500 });
  }
}
