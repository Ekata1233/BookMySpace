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

// Define valid business types
const validBusinessTypes = [
  "individual",
  "sole_proprietorship",
  "partnership",
  "corporation",
  "llc",
  "non_profit",
  "government_entity"
];

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

    // Validate business type
    const businessType = getValue("businessType").toLowerCase();
    if (!validBusinessTypes.includes(businessType)) {
      return NextResponse.json(
        { error: "Invalid business type provided. Valid types are: " + validBusinessTypes.join(", ") },
        { status: 400 }
      );
    }

    // Save logo
    let logoUrl = "";
    if (logo) {
      const uniqueLogoName = `${uuidv4()}${path.extname(logo.name)}`;
      const buffer = Buffer.from(await logo.arrayBuffer());
      const filePath = path.join(uploadDir, uniqueLogoName);
      await writeFile(filePath, buffer);
      logoUrl = `/uploads/${uniqueLogoName}`;
    }

    // Save document image
    let documentImageUrl = "";
    if (documentImage) {
      const uniqueDocName = `${uuidv4()}${path.extname(documentImage.name)}`;
      const buffer = Buffer.from(await documentImage.arrayBuffer());
      const filePath = path.join(uploadDir, uniqueDocName);
      await writeFile(filePath, buffer);
      documentImageUrl = `/uploads/${uniqueDocName}`;
    }

    // Check for existing vendor
    const existingVendor = await Vendor.findOne({ workEmail: getValue("workEmail") });
    if (existingVendor) {
      return NextResponse.json(
        { error: "Vendor already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const password = getValue("password");
    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate order ID (format: ORD-YYYYMMDD-XXXXXX)
    const now = new Date();
    const datePart = now.toISOString().slice(0, 10).replace(/-/g, '');
    const randomPart = Math.floor(100000 + Math.random() * 900000);
    const orderId = `ORD-${datePart}-${randomPart}`;

    // Create new vendor
    const newVendor = new Vendor({
      companyName: getValue("companyName"),
      workEmail: getValue("workEmail"),
      phone: getValue("phone"),
      website: getValue("website"),
      businessType,
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
      order_id: orderId,  // Add the generated order ID
    });

    await newVendor.save();

    return NextResponse.json(
      { 
        message: "Vendor registered successfully",
        data: {
          order_id: orderId,
          vendor_id: newVendor._id,
          companyName: newVendor.companyName,
          status: newVendor.status
        }
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup Error:", error);
    return NextResponse.json(
      { 
        error: "Signup failed",
        details: error.message,
        ...(error.errors && { validationErrors: error.errors })
      },
      { status: 500 }
    );
  }
}