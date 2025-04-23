import { NextRequest, NextResponse } from "next/server";
import Vendor from "@/models/vendor";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "$ecretKey123";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase(); // ⬅️ important!

    const body = await req.json();
    const { workEmail, password } = body;

    if (!workEmail || !password) {
      return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
    }

    const vendor = await Vendor.findOne({ workEmail });
    if (!vendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }

    const isMatch = await vendor.comparePassword(password); // ⬅️ clean and model-based
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      { id: vendor._id, email: vendor.workEmail },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password: _, ...vendorData } = vendor.toObject();

    return NextResponse.json({ token, vendor: vendorData }, { status: 200 });
  } catch (error: any) {
    console.error("Vendor Login Error:", error.message || error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
