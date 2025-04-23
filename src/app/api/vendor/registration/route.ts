import { NextRequest, NextResponse } from "next/server";
import Vendor from "@/models/vendor";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import testConnection from "@/lib/db"; // ✅ update if you use a different path

const JWT_SECRET = process.env.JWT_SECRET || "$ecretKey123";

export async function POST(req: NextRequest) {
  try {
    await testConnection(); // ✅ important

    const body = await req.json();
    const { workEmail, password } = body;

    if (!workEmail || !password) {
      return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
    }

    const vendor = await Vendor.findOne({ workEmail });

    if (!vendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, vendor.password);

    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      { id: vendor._id, email: vendor.workEmail },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password: _, ...vendorData } = vendor.toObject(); // remove password before sending

    return NextResponse.json({ token, vendor: vendorData }, { status: 200 });
  } catch (error: any) {
    console.error("🔴 Login Error:", error.message || error); // more detailed logging
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
