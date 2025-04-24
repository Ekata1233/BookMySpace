// src/app/api/vendor/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Vendor from '../../../../models/vendor';
import { connectToDatabase } from '@/lib/db';
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || "$ecretKey123";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase(); // ✅ Ensure DB is connected

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

    const { password: _, ...vendorData } = vendor.toObject(); // Remove password from response

    return NextResponse.json({ token, vendor: vendorData }, { status: 200 });
  } catch (error: any) {
    console.error("🔴 Login Error:", error.message || error); // More detailed logging
    return NextResponse.json({ error: "Internal Server Error 4" }, { status: 500 });
  }
}