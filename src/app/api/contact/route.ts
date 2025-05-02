import { NextResponse } from "next/server";
import testConnection from "@/lib/db";
import Contact from "../../../models/contact";

// Connect to MongoDB
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
    const contacts = await Contact.find({});
    return NextResponse.json(
      { success: true, data: contacts },
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

export async function POST(req: Request) {
  await testConnection();

  try {
    const { name, email, company, phone, requirement, inquiry } =
      await req.json();

    if (!name || !email || !phone || !requirement || !inquiry) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    // Create new contact entry in the database
    const newContact = await Contact.create({
      name,
      email,
      company,
      phone,
      requirement,
      inquiry,
    });

    return NextResponse.json(
      { success: true, data: newContact },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 },
    );
  }
}


