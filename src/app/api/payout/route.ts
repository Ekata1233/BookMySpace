// import { NextResponse, NextRequest } from "next/server";
// import axios from "axios";
// import testConnection from "@/lib/db";
// import VendorBankDetails from "@/models/VendorBankDetails";
// import PayoutSchema from "@/models/PayoutSchema";
// import { Types } from "mongoose";

// testConnection();

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//   "Access-Control-Allow-Headers": "Content-Type, Authorization",
// };

// // Handle preflight requests
// export async function OPTIONS() {
//   return NextResponse.json({}, { headers: corsHeaders });
// }

// // GET all vendors for payout listing (you can filter this if needed)
// export async function GET() {
//   try {
//     const vendors = await VendorBankDetails.find({});
//     return NextResponse.json(
//       { success: true, data: vendors },
//       { status: 200, headers: corsHeaders }
//     );
//   } catch (error: any) {
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500, headers: corsHeaders }
//     );
//   }
// }

// // POST: Process payout to vendor
// export async function POST(req: NextRequest) {
//   try {
//     const { vendorId, amount, paymentMethod } = await req.json();

//     if (!vendorId || !amount || !paymentMethod) {
//       return NextResponse.json(
//         { success: false, message: "Missing required fields" },
//         { status: 400, headers: corsHeaders }
//       );
//     }

//     console.log("Received vendorId:", vendorId);

//     const vendor = await VendorBankDetails.findOne({ vendorId: vendorId });

//     console.log("Vendor result:", vendor);

//     if (!vendor) {
//       return NextResponse.json(
//         { success: false, message: "Vendor bank details not found" },
//         { status: 404, headers: corsHeaders }
//       );
//     }

//     const payoutData: any = {
//       amount: amount * 100, // convert to paise
//       currency: "INR",
//       purpose: "payout",
//       mode: paymentMethod,
//       narration: `Payout to vendor ${vendor.name || vendor._id}`,
//     };

//     console.log("Payout Data:", payoutData);


//     if (paymentMethod === "bank_transfer") {
//       payoutData.fund_account = {
//         account_type: vendor.accountType,
//         bank_account: {
//           name: vendor.bankName || "Vendor",
//           ifsc: vendor.ifscCode,
//           account_number: vendor.accountNumber,
//         },
//         contact: {
//           name: vendor.accountHolder || "Vendor",
//           type: "vendor",
//           phone: vendor.phone,
//         },
//       };
//     } else if (paymentMethod === "upi") {
//       payoutData.fund_account = {
//         account_type: "vpa",
//         vpa: {
//           address: vendor.upiId,
//         },
//         contact: {
//           name: vendor.accountHolder || "Vendor",
//           type: "vendor",
//           phone: vendor.phone,
//         },
//       };
//     } else {
//       return NextResponse.json(
//         { success: false, message: "Invalid payment method" },
//         { status: 400, headers: corsHeaders }
//       );
//     }
    
//     console.log("Sending payout request to Razorpay...");
//     const response = await axios.post(
//       "https://api.razorpay.com/v1/payouts",
//       payoutData,
//       {
//         auth: {
//           username: process.env.RAZORPAY_KEY_ID!,
//           password: process.env.RAZORPAY_KEY_SECRET!,
//         },
//       }
//     );

//     console.log("Razorpay Response:", response.data);

//     // Save payout in DB
//     await PayoutSchema.create({
//       vendor: vendorId,
//       amount,
//       paymentMethod,
//       transactionId: response.data.id,
//       razorpayStatus: response.data.status,
//       notes: response.data.narration || "",
//       paidAt: new Date(),
//     });

//     return NextResponse.json(
//       { success: true, data: response.data },
//       { status: 200, headers: corsHeaders }
//     );
//   } catch (error: any) {
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500, headers: corsHeaders }
//     );
//   }
// }


import { NextResponse, NextRequest } from "next/server";
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
export async function POST(req: NextRequest) {
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

    console.log("Vendor result:", vendor);

    if (!vendor) {
      return NextResponse.json(
        { success: false, message: "Vendor bank details not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    const razorpayAuth = {
      username: process.env.PAYOUT_RAZORPAY_KEY_ID || "rzp_test_tcKo6REb3XcVyx",
      password: process.env.PAYOUT_RAZORPAY_KEY_SECRET || "8aR5rqAJQQi2WGQXz05OYDo3",
    };

    // 1. Create Contact
    console.log("Creating Razorpay Contact...");
    const contactResponse = await axios.post(
      "https://api.razorpay.com/v1/contacts",
      {
        name: vendor.accountHolder || "Vendor",
        contact: vendor.phone || "",
        type: "vendor",
        reference_id: vendor.vendorId.toString(),
        notes: {
          vendorId: vendor.vendorId.toString(),
        },
      },
      { auth: razorpayAuth }
    );

    const contactId = contactResponse.data.id;
    console.log("Contact created with ID:", contactId);

    // 2. Create Fund Account
    console.log("Creating Razorpay Fund Account...");

    let fundAccountPayload: any = {
      contact_id: contactId,
      account_type: "",
    };

    if (paymentMethod === "bank_transfer") {
      if (!vendor.ifscCode || !vendor.accountNumber) {
        return NextResponse.json(
          { success: false, message: "Missing bank details for vendor" },
          { status: 400, headers: corsHeaders }
        );
      }
      fundAccountPayload.account_type = "bank_account";
      fundAccountPayload.bank_account = {
        name: vendor.accountHolder || "Vendor",
        ifsc: vendor.ifscCode,
        account_number: vendor.accountNumber,
      };
    } else if (paymentMethod === "upi") {
      if (!vendor.upiId) {
        return NextResponse.json(
          { success: false, message: "Missing UPI ID for vendor" },
          { status: 400, headers: corsHeaders }
        );
      }
      fundAccountPayload.account_type = "vpa";
      fundAccountPayload.vpa = {
        address: vendor.upiId,
      };
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid payment method" },
        { status: 400, headers: corsHeaders }
      );
    }

    const fundAccountResponse = await axios.post(
      "https://api.razorpay.com/v1/fund_accounts",
      fundAccountPayload,
      { auth: razorpayAuth }
    );

    const fundAccountId = fundAccountResponse.data.id;
    console.log("Fund Account created with ID:", fundAccountId);

    // 3. Create Payout
    console.log("Creating Razorpay Payout...");
    const payoutPayload = {
      account_number: "2323230000000001", // Razorpay test virtual account number
      fund_account_id: fundAccountId,
      amount: amount * 100, // Razorpay expects paise
      currency: "INR",
      mode: paymentMethod === "upi" ? "UPI" : "IMPS",
      purpose: "payout",
      queue_if_low_balance: true,
      narration: `Payout to vendor ${vendor.accountHolder || vendor._id}`,
    };

    const payoutResponse = await axios.post(
      "https://api.razorpay.com/v1/payouts",
      payoutPayload,
      { auth: razorpayAuth }
    );

    console.log("Razorpay Payout Response:", payoutResponse.data);

    // Save payout to database
    await PayoutSchema.create({
      vendor: vendorId,
      amount,
      paymentMethod,
      transactionId: payoutResponse.data.id,
      razorpayStatus: payoutResponse.data.status,
      notes: payoutResponse.data.narration || "",
      paidAt: new Date(),
    });

    return NextResponse.json(
      { success: true, data: payoutResponse.data },
      { status: 200, headers: corsHeaders }
    );
  } 
  catch (error: any) {
    console.error("Error occurred:", error);

    // Log the complete response for better debugging
    if (error.response && error.response.data) {
        console.error("Razorpay Error Response:", error.response.data);
        return NextResponse.json(
            { success: false, message: error.response.data.error.description || "Razorpay API Error" },
            { status: 400, headers: corsHeaders }
        );
    } else {
        return NextResponse.json(
            { success: false, message: error.message || "Internal Server Error" },
            { status: 500, headers: corsHeaders }
        );
    }
}

}
