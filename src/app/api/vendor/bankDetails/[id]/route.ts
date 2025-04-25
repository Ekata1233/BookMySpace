import { NextResponse } from "next/server";
import VendorBankDetails from "@/models/VendorBankDetails";
import { connectToDatabase } from "../../../../../lib/db";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ✅ Handle preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// ✅ PUT - Update VendorBankDetails
export async function PUT(request: Request, context: any) {
  await connectToDatabase();

  try {
    const { id } = context.params;
    const updateData = await request.json();

    const updatedVendorBankDetails = await VendorBankDetails.findByIdAndUpdate(
      id,
      updateData,
      { new: true },
    );

    if (!updatedVendorBankDetails) {
      return NextResponse.json(
        { success: false, message: "Vendor Bank Details not found" },
        { status: 404, headers: corsHeaders },
      );
    }

    return NextResponse.json(
      { success: true, data: updatedVendorBankDetails },
      { status: 200, headers: corsHeaders },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400, headers: corsHeaders },
    );
  }
}

// ✅ DELETE - Soft Delete VendorBankDetails
export async function DELETE(request: Request, context: any) {
  await connectToDatabase();

  try {
    const { id } = context.params;

    const deletedVendorBankDetails = await VendorBankDetails.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );

    if (!deletedVendorBankDetails) {
      return NextResponse.json(
        { success: false, message: "Vendor Bank Details not found" },
        { status: 404, headers: corsHeaders },
      );
    }

    return NextResponse.json(
      { success: true, data: deletedVendorBankDetails },
      { status: 200, headers: corsHeaders },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400, headers: corsHeaders },
    );
  }
}
