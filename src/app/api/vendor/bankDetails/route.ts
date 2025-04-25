import { NextResponse, NextRequest } from "next/server";
import testConnection from "@/lib/db";
import VendorBankDetails from "@/models/VendorBankDetails";
import vendor from "@/models/vendor";

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

export async function GET() {
  try {
    const bankDetails = await VendorBankDetails.find({});
    return NextResponse.json(
      { success: true, data: bankDetails },
      { status: 200, headers: corsHeaders },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500, headers: corsHeaders },
    );
  }
}

export async function POST(req: Request) {
  try {
    const {
      bankName,
      accountHolder,
      accountNumber,
      ifscCode,
      branchName,
      accountType,
      phone,
      bankProof,
      verification,
      vendorId,
    } = await req.json();

    // Validate required fields
    if (
      !bankName ||
      !accountHolder ||
      !accountNumber ||
      !ifscCode ||
      !accountType ||
      !vendorId
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400, headers: corsHeaders },
      );
    }

    // Additional validation
    if (!/^\d{10}$/.test(phone)) {
      // Basic phone number check (10 digits)
      return NextResponse.json(
        { success: false, message: "Invalid phone number format" },
        { status: 400, headers: corsHeaders },
      );
    }

    // Check if vendorId exists in the Vendor collection (if applicable)
    const vendorExists = await vendor.findById(vendorId);
    if (!vendorExists) {
      return NextResponse.json(
        { success: false, message: "Vendor does not exist" },
        { status: 404, headers: corsHeaders },
      );
    }

    const newBankDetails = await VendorBankDetails.create({
      bankName,
      accountHolder,
      accountNumber,
      ifscCode,
      branchName,
      accountType,
      phone,
      bankProof,
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
