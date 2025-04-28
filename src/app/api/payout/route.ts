import { NextResponse } from "next/server";
import axios from "axios";
import testConnection from "@/lib/db";
import VendorBankDetails from "@/models/VendorBankDetails";
import PayoutSchema from "@/models/PayoutSchema";
import mongoose from "mongoose";

testConnection();

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handle preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// GET all vendors for payout listing
export async function GET() {
  try {
    const vendors = await VendorBankDetails.find({});
    return NextResponse.json(
      { success: true, data: vendors },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

// POST: Process payout to vendor
export async function POST(req: Request) {
  try {
    const { vendorId, amount, paymentMethod } = await req.json();
    console.log("Request vendorId:", vendorId);

    if (!vendorId || !amount || !paymentMethod) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(vendorId)) {
      return NextResponse.json(
        { success: false, message: "Invalid vendorId format" },
        { status: 400, headers: corsHeaders }
      );
    }

    const vendor = await VendorBankDetails.findOne({ vendorId: vendorId });
    console.log("Fetched vendor:", vendor);

    if (!vendor) {
      return NextResponse.json(
        { success: false, message: "Vendor bank details not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    const payoutData: any = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      purpose: "payout",
      mode: paymentMethod,
      narration: `Payout to vendor ${vendor.accountHolder || vendor._id}`,
    };

    if (paymentMethod === "bank_transfer") {
      payoutData.fund_account = {
        account_type: "bank_account",
        bank_account: {
          name: vendor.accountHolder || "Vendor",
          ifsc: vendor.ifscCode,
          account_number: vendor.accountNumber,
        },
        contact: {
          name: vendor.accountHolder || "Vendor",
          type: "vendor",
          email: vendor.email || "test@example.com",
        },
      };
    } else if (paymentMethod === "upi") {
      payoutData.fund_account = {
        account_type: "vpa",
        vpa: { address: vendor.upiId },
        contact: {
          name: vendor.accountHolder || "Vendor",
          type: "vendor",
          email: vendor.email || "test@example.com",
        },
      };
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid payment method" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Log the payout data to verify its structure before sending it
    console.log("Payout data being sent to Razorpay:", payoutData);

    const response = await axios.post(
      "https://api.razorpay.com/v1/payouts", // Confirmed correct URL in documentation
      payoutData,
      {
        auth: {
          username: process.env.RAZORPAY_KEY_ID!,
          password: process.env.RAZORPAY_KEY_SECRET!,
        },
      }
    );

    console.log("Razorpay response:", response.data);

    await PayoutSchema.create({
      vendor: vendorId,
      amount,
      paymentMethod,
      transactionId: response.data.id,
      razorpayStatus: response.data.status,
      notes: response.data.narration || "",
      paidAt: new Date(),
    });

    return NextResponse.json(
      { success: true, data: response.data },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error("Error processing payout:", error);
    
    if (error.response) {
      console.error("Razorpay error response data:", error.response.data);
      return NextResponse.json(
        { success: false, message: error.response.data.error.description },
        { status: 500, headers: corsHeaders }
      );
    } else {
      console.error("Error message:", error.message);
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500, headers: corsHeaders }
      );
    }
  }
}




