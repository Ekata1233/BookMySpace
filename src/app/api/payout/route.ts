import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import testConnection from "@/lib/db";
import VendorBankDetails from "@/models/VendorBankDetails";
import PayoutSchema from "@/models/PayoutSchema";

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

// GET all vendors for payout listing (you can filter this if needed)
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

    if (!vendorId || !amount || !paymentMethod) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400, headers: corsHeaders }
      );
    }

    const vendor = await VendorBankDetails.findById(vendorId);
    if (!vendor) {
      return NextResponse.json(
        { success: false, message: "Vendor not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    const payoutData: any = {
      amount: amount * 100, // convert to paise
      currency: "INR",
      purpose: "payout",
      mode: paymentMethod,
      narration: `Payout to vendor ${vendor.name || vendor._id}`,
    };

    if (paymentMethod === "bank_transfer") {
      payoutData.fund_account = {
        account_type: "bank_account",
        bank_account: {
          name: vendor.accountHolderName || "Vendor",
          ifsc: vendor.ifscCode,
          account_number: vendor.bankAccount,
        },
        contact: {
          name: vendor.name || "Vendor",
          type: "vendor",
          email: vendor.email,
        },
      };
    } else if (paymentMethod === "upi") {
      payoutData.fund_account = {
        account_type: "vpa",
        vpa: {
          address: vendor.upiId,
        },
        contact: {
          name: vendor.name || "Vendor",
          type: "vendor",
          email: vendor.email,
        },
      };
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid payment method" },
        { status: 400, headers: corsHeaders }
      );
    }

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

    // Save payout in DB
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
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}
