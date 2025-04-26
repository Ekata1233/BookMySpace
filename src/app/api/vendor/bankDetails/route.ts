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

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  try {
    const bankDetails = await VendorBankDetails.find({});
    return NextResponse.json(
      { success: true, data: bankDetails },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      bankName,
      accountHolder,
      accountNumber,
      ifscCode,
      branchName,
      accountType,
      phone,
      upiId,
      bankProof,
      verification,
      vendorId,
    } = body;

    const missingFields = [];
    if (!bankName) missingFields.push("bankName");
    if (!accountHolder) missingFields.push("accountHolder");
    if (!accountNumber) missingFields.push("accountNumber");
    if (!ifscCode) missingFields.push("ifscCode");
    if (!accountType) missingFields.push("accountType");
    if (!vendorId) missingFields.push("vendorId");
    if (!upiId) missingFields.push("upiId");
    if (!bankProof) missingFields.push("bankProof");

    if (missingFields.length > 0) {
      return NextResponse.json(
        { success: false, message: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400, headers: corsHeaders }
      );
    }

    if (phone && !/^\d{10}$/.test(phone)) {
      return NextResponse.json(
        { success: false, message: "Invalid phone number format" },
        { status: 400, headers: corsHeaders }
      );
    }

    const upiIdRegex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+$/;
    if (upiId && !upiIdRegex.test(upiId)) {
      return NextResponse.json(
        { success: false, message: "Invalid UPI ID format" },
        { status: 400, headers: corsHeaders }
      );
    }

    const vendorExists = await vendor.findById(vendorId);
    if (!vendorExists) {
      return NextResponse.json(
        { success: false, message: "Vendor does not exist" },
        { status: 404, headers: corsHeaders }
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
      upiId,
      bankProof,
      verification,
      vendorId,
    });

    return NextResponse.json(
      { success: true, data: newBankDetails },
      { status: 201, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error("BankDetails POST Error:", error);
    return NextResponse.json(
      { success: false, message: "Error creating vendor bank details: " + error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}
