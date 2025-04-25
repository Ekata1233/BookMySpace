import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import testConnection from "@/lib/db";
import VendorBankDetails from "@/models/VendorBankDetails";

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

// Handle GET request for payout history or vendor payout information
export async function GET() {
  try {
    const vendors = await VendorBankDetails.find({  });
    return NextResponse.json(
      { success: true, data: vendors },
      { status: 200, headers: corsHeaders },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500, headers: corsHeaders },
    );
  }
}

// Handle POST request for processing vendor payout
export async function POST(req: Request) {
  try {
    const { vendorId, amount, paymentMethod } = await req.json();

    if (!vendorId || !amount || !paymentMethod) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400, headers: corsHeaders },
      );
    }

    // Fetch vendor details from the database
    const vendor = await VendorBankDetails.findById(vendorId);
    if (!vendor) {
      return NextResponse.json(
        { success: false, message: "Vendor not found" },
        { status: 404, headers: corsHeaders },
      );
    }

    // Prepare payout data
    const payoutData: any = {
      amount: amount * 100, // Razorpay accepts amounts in paise
      currency: "INR",
      purpose: "payout",
    };

    if (paymentMethod === "bank_transfer") {
      payoutData.account_number = vendor.bankAccount;
      payoutData.ifsc = vendor.ifscCode;
    } else if (paymentMethod === "upi") {
      payoutData.upi = vendor.upiId;
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid payment method" },
        { status: 400, headers: corsHeaders },
      );
    }

    // Make the payout request to Razorpay's Payouts API
    const response = await axios.post(
      "https://api.razorpay.com/v1/payouts",
      payoutData,
      {
        auth: {
          username: process.env.RAZORPAY_KEY_ID!,
          password: process.env.RAZORPAY_KEY_SECRET!,
        },
      }
    );

    // Respond with success message and payout details
    return NextResponse.json(
      { success: true, data: response.data },
      { status: 200, headers: corsHeaders },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500, headers: corsHeaders },
    );
  }
}
