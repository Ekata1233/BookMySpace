import { NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import testConnection from "@/lib/db";
import VendorBankDetails from "@/models/VendorBankDetails";
import vendor from "@/models/vendor";
import { existsSync } from "fs";

// Connect to MongoDB
testConnection();

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ✅ Handle preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  await testConnection();

  try {
    const formData = await req.formData();

    const bankName = formData.get("bankName") as string;
    const accountHolder = formData.get("accountHolder") as string;
    const accountNumber = formData.get("accountNumber") as string;
    const ifscCode = formData.get("ifscCode") as string;
    const branchName = formData.get("branchName") as string;
    const accountType = formData.get("accountType") as string;
    const phone = formData.get("phone") as string;
    const upiId = formData.get("upiId") as string;
    const verification = formData.get("verification") === "true";
    const vendorId = formData.get("vendorId") as string;

    // Validate required fields
    if (!bankName || !accountHolder || !accountNumber || !ifscCode || !accountType || !vendorId) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400, headers: corsHeaders },
      );
    }

    // Ensure 'public/uploads' directory exists
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Handle file upload for bankProof
    let bankProofUrl = "";
    const file = formData.get("bankProof") as File | null;

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filePath = path.join(uploadDir, file.name);

      await writeFile(filePath, buffer);
      bankProofUrl = `/uploads/${file.name}`;
    }

    // Check if vendor exists
    const vendorExists = await vendor.findById(vendorId);
    if (!vendorExists) {
      return NextResponse.json(
        { success: false, message: "Vendor does not exist" },
        { status: 404, headers: corsHeaders },
      );
    }

    // Create new vendor bank details entry
    const newBankDetails = await VendorBankDetails.create({
      bankName,
      accountHolder,
      accountNumber,
      ifscCode,
      branchName,
      accountType,
      phone,
      upiId,
      bankProof: bankProofUrl,
      verification,
      vendorId,
    });

    return NextResponse.json(
      { success: true, data: newBankDetails },
      { status: 201, headers: corsHeaders },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400, headers: corsHeaders },
    );
  }
}

export async function GET() {
  try {
    const bankDetails = await VendorBankDetails.find({});
    return NextResponse.json(
      { success: true, data: bankDetails },
      { status: 200, headers: corsHeaders },
    );
  } catch (error: any) {
    console.error("Error:", error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500, headers: corsHeaders },
    );
  }
}
