// src/app/api/razorpay/route.ts

import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    // TEMP LOG TO VERIFY ENV
    console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);
    console.log("Razorpay Key Secret:", process.env.RAZORPAY_KEY_SECRET);

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const body = await req.json();

    const options = {
      amount: body.totalPay * 100,
      currency: "INR",
      receipt: `receipt_order_${Math.floor(Math.random() * 1000000)}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({ orderId: order.id });
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}
