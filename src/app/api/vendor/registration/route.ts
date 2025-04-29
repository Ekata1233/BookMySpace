import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import testConnection from "@/lib/db";
import Vendor from "@/models/vendor";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import bcrypt from "bcryptjs";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});


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
  try {
    const formData = await req.formData();
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true });

    const getValue = (key: string) => formData.get(key)?.toString() || "";
    const logo = formData.get("logo") as File | null;
    const documentImage = formData.get("documentImage") as File | null;

    // Save logo
    let logoUrl = "";
    if (logo) {
      const buffer = Buffer.from(await logo.arrayBuffer());
      const filePath = path.join(uploadDir, logo.name);
      await writeFile(filePath, buffer);
      logoUrl = `/uploads/${logo.name}`;
    }

    // Save document image
    let documentImageUrl = "";
    if (documentImage) {
      const buffer = Buffer.from(await documentImage.arrayBuffer());
      const filePath = path.join(uploadDir, documentImage.name);
      await writeFile(filePath, buffer);
      documentImageUrl = `/uploads/${documentImage.name}`;
    }

    const existingVendor = await Vendor.findOne({ workEmail: getValue("workEmail") });
    if (existingVendor) {
      return NextResponse.json({ error: "Vendor already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(getValue("password"), 10);

    const newVendor = new Vendor({
      companyName: getValue("companyName"),
      workEmail: getValue("workEmail"),
      phone: getValue("phone"),
      website: getValue("website"),
      businessType: getValue("businessType"),
      address: getValue("address"),
      message: getValue("message"),
      logo: logoUrl,
      contactName: getValue("contactName"),
      contactMobile: getValue("contactMobile"),
      contactEmail: getValue("contactEmail"),
      documentType: getValue("documentType"),
      documentNo: getValue("documentNo"),
      documentImage: documentImageUrl,
      password: hashedPassword,
      agreed: getValue("agreed") === "true",
      paid: true,
      amount: getValue("amount"),
      status: "pending",
    });

    await newVendor.save();

// Create Razorpay Order
const razorpayOrder = await razorpay.orders.create({
  amount: Number(getValue("amount")) * 100,
  currency: "INR",
  receipt: `rcpt_${Date.now()}`,
});

// Send back message and order info
return NextResponse.json({
  message: "Vendor registered successfully",
  order: razorpayOrder,
}, { status: 201 });

  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}
