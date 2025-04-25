// /api/vendor/registration/route.ts
import { NextRequest, NextResponse } from "next/server";
import Vendor from "../../../../models/vendor";
import jwt from "jsonwebtoken";
import testConnection from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "$ecretKey123";

export async function POST(req: NextRequest) {
  try {
    await testConnection();

    const body = await req.json();
    const {
      companyName,
      workEmail,
      phone,
      website,
      businessType,
      address,
      message,
      logo,
      contactName,
      contactMobile,
      contactEmail,
      documentType,
      documentNo,
      documentImage,
      password,
      agreed,
      paid,
      amount,
    } = body;

    if (
      !companyName ||
      !workEmail ||
      !phone ||
      !businessType ||
      !address ||
      !contactName ||
      !contactMobile ||
      !contactEmail ||
      !documentType ||
      !documentNo ||
      !password ||
      agreed === undefined
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const existingVendor = await Vendor.findOne({ workEmail });
    if (existingVendor) {
      return NextResponse.json(
        { error: "Vendor with this email already exists" },
        { status: 409 },
      );
    }

    const newVendor = new Vendor({
      companyName,
      workEmail,
      phone,
      website,
      businessType,
      address,
      message,
      logo: logo || "",
      contactName,
      contactMobile,
      contactEmail,
      documentType,
      documentNo,
      documentImage: documentImage || "",
      password, // No manual bcrypt.hash here
      agreed,
      paid: paid || false,
      amount,
    });

    const savedVendor = await newVendor.save();

    const token = jwt.sign(
      { id: savedVendor._id, email: savedVendor.workEmail },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    const { password: _, ...vendorData } = savedVendor.toObject();

    return NextResponse.json({ token, vendor: vendorData }, { status: 201 });
  } catch (error: any) {
    console.error("🔴 Registration Error:", error.message || error);
    return NextResponse.json(
      { error: "Internal Server Error 5" },
      { status: 500 },
    );
  }
}
