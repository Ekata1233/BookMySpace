import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import testConnection from "@/lib/db";
import Vendor from "@/models/vendor";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  await testConnection();

  const session = await getServerSession(authOptions);



  const body = await req.json();
  const order_id = uuidv4();

  const newOrder = new Vendor({
    order_id,
    amount: body.amount,
    // userId: session.user.email,
    status: "pending",
    name: body.name,
    companyName: body.companyName,
    workEmail: body.workEmail,
    phone: body.phone,
    address: body.address,
    website: body.website,
    businessType: body.businessType,
    message: body.message,
    agreed: body.agreed,
    paid: true,
  });

  await newOrder.save();

  return NextResponse.json({ message: "Order created successfully", order_id });
}
