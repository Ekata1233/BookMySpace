import testConnection from "@/lib/db";
import officeSpaces from "@/models/officeSpaces";
import { NextResponse } from "next/server";

// Connect to MongoDB
testConnection();

// POST method for creating an office space
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newOfficeSpace = await officeSpaces.create(body);
    return NextResponse.json({ success: true, data: newOfficeSpace }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

export async function GET() {
    try {
      const newOfficeSpace = await officeSpaces.find({});
      return NextResponse.json({ success: true, data: newOfficeSpace }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
  }
