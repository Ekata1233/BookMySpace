import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import testConnection from "@/lib/db";
import Vendor from "@/models/vendor";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  await testConnection(); 
  try {
    const vendor = await Vendor.find({});
    return NextResponse.json({ success: true, data: vendor }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await testConnection();

  const session = await getServerSession(authOptions);
  try {
    const body = await req.json();
    

    const order_id = uuidv4();

    const newOrder = new Vendor({
      order_id,
      amount: body.amount,
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
      userId: session?.user?.email || "", 
    });

    await newOrder.save();
    console.log("✅ Vendor saved successfully");

    return NextResponse.json({ message: "Order created successfully", order_id });

  } catch (error) {
    console.error("❌ Error saving vendor:", error);
    return NextResponse.json({ error: "Failed to create vendor" }, { status: 500 });
  }
}
