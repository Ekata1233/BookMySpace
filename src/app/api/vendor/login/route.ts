import { NextRequest, NextResponse } from "next/server";
import Vendor from "@/models/vendor";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "$bookjwt"; // Use real env in production

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { workEmail, password } = body;

    const vendor = await Vendor.findOne({ workEmail });
    if (!vendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 });
    }

    const isValidPassword = await vendor.comparePassword(password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Password not match" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: vendor._id, email: vendor.workEmail },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json({ token, vendor }, { status: 200 });
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
