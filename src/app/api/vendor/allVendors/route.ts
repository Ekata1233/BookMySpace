import { NextResponse } from "next/server";
import testConnection from "@/lib/db";
import vendor from "@/models/vendor";

testConnection();

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function GET() {
  try {
    const users = await vendor.find({}, "-password");
    return NextResponse.json(
      { success: true, data: users },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}


