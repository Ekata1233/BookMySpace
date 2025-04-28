import { NextRequest, NextResponse } from "next/server";
import Vendor from "../../../../models/vendor";
import jwt from "jsonwebtoken";
import testConnection from "@/lib/db";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "$ecretKey123";

export async function POST(req: NextRequest) {
  try {
    console.log("Request received at /api/vendor/registration");

    // Ensure the database connection is established
    await testConnection();
    console.log("Database connected successfully");

    // Parse the incoming JSON body directly
    const body = await req.json();
    console.log("Parsed Request Body:", body); // Debugging request body

    const {
      companyName,
      workEmail,
      phone,
      website,
      businessType,
      address,
      message,
      logo,
      contactName,
      contactMobile,
      contactEmail,
      documentType,
      documentNo,
      documentImage,
      password,
      agreed,
      paid,
      amount,
    } = body;

    // Validate required fields
    if (
      !companyName ||
      !workEmail ||
      !phone ||
      !businessType ||
      !address ||
      !contactName ||
      !contactMobile ||
      !contactEmail ||
      !documentType ||
      !documentNo ||
      !password ||
      agreed === undefined ||
      amount === undefined
    ) {
      console.log("Error: Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Continue with other validations as in your original code...
    console.log("Validations passed");

    // Check if the vendor with the same email already exists
    const existingVendor = await Vendor.findOne({ workEmail });
    if (existingVendor) {
      console.log("Error: Vendor with this email already exists");
      return NextResponse.json(
        { error: "Vendor with this email already exists" },
        { status: 409 }
      );
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed successfully");

    // Create a new vendor document
    const newVendor = new Vendor({
      companyName,
      workEmail,
      phone,
      website,
      businessType,
      address,
      message,
      logo: logo || "",
      contactName,
      contactMobile,
      contactEmail,
      documentType,
      documentNo: Number(documentNo),
      documentImage: documentImage || "",
      password: hashedPassword, // Store hashed password
      agreed,
      paid: paid || false,
      amount,
    });

    // Save the new vendor
    const savedVendor = await newVendor.save();
    console.log("Vendor saved successfully");

    // Generate JWT token
    const token = jwt.sign(
      { id: savedVendor._id, email: savedVendor.workEmail },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    console.log("JWT token generated");

    // Omit the password from the response
    const { password: _, ...vendorData } = savedVendor.toObject();

    return NextResponse.json({ token, vendor: vendorData }, { status: 201 });
  } catch (error: any) {
    console.error("🔴 Registration Error:", error.message || error);
    console.error("Full Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
