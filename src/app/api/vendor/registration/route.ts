// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/lib/auth";
// import { NextRequest, NextResponse } from "next/server";
// import testConnection from "@/lib/db";
// import Vendor from "@/models/vendor";
// import { v4 as uuidv4 } from "uuid";
// import path from "path";
// import bcrypt from "bcryptjs";
// import { writeFile, mkdir } from "fs/promises";
// import { existsSync } from "fs";
// import Razorpay from "razorpay";

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID!,
//   key_secret: process.env.RAZORPAY_KEY_SECRET!,
// });


// export async function GET() {
//   await testConnection();
//   try {
//     const vendor = await Vendor.find({});
//     return NextResponse.json({ success: true, data: vendor }, { status: 200 });
//   } catch (error: any) {
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();
//     const uploadDir = path.join(process.cwd(), "public/uploads");
//     if (!existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true });

//     const getValue = (key: string) => formData.get(key)?.toString() || "";
//     const logo = formData.get("logo") as File | null;
//     const documentImage = formData.get("documentImage") as File | null;

//     // Save logo
//     let logoUrl = "";
//     if (logo) {
//       const buffer = Buffer.from(await logo.arrayBuffer());
//       const filePath = path.join(uploadDir, logo.name);
//       await writeFile(filePath, buffer);
//       logoUrl = `/uploads/${logo.name}`;
//     }

//     // Save document image
//     let documentImageUrl = "";
//     if (documentImage) {
//       const buffer = Buffer.from(await documentImage.arrayBuffer());
//       const filePath = path.join(uploadDir, documentImage.name);
//       await writeFile(filePath, buffer);
//       documentImageUrl = `/uploads/${documentImage.name}`;
//     }

//     const existingVendor = await Vendor.findOne({ workEmail: getValue("workEmail") });
//     if (existingVendor) {
//       return NextResponse.json({ error: "Vendor already exists" }, { status: 400 });
//     }

//     const hashedPassword = await bcrypt.hash(getValue("password"), 10);

//     const newVendor = new Vendor({
//       companyName: getValue("companyName"),
//       workEmail: getValue("workEmail"),
//       phone: getValue("phone"),
//       website: getValue("website"),
//       businessType: getValue("businessType"),
//       address: getValue("address"),
//       message: getValue("message"),
//       logo: logoUrl,
//       contactName: getValue("contactName"),
//       contactMobile: getValue("contactMobile"),
//       contactEmail: getValue("contactEmail"),
//       documentType: getValue("documentType"),
//       documentNo: getValue("documentNo"),
//       documentImage: documentImageUrl,
//       password: hashedPassword,
//       agreed: getValue("agreed") === "true",
//       paid: true,
//       amount: getValue("amount"),
//       status: "pending",
//     });

//     await newVendor.save();

//     // Create Razorpay Order
//     const razorpayOrder = await razorpay.orders.create({
//       amount: Number(getValue("amount")) * 100,
//       currency: "INR",
//       receipt: `rcpt_${Date.now()}`,
//     });

//     // Send back message and order info
//     return NextResponse.json({
//       message: "Vendor registered successfully",
//       order: razorpayOrder,
//     }, { status: 201 });

//   } catch (error) {
//     console.error("Signup Error:", error);
//     return NextResponse.json({ error: "registration failed" }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import jwt from 'jsonwebtoken';
import Vendor from '@/models/vendor';
import testConnection from '@/lib/db';

export const config = {
  api: {
    bodyParser: false,
  },
};

const JWT_SECRET = process.env.JWT_SECRET || '$ecretKey123';

export async function POST(req: Request) {
  try {
    await testConnection();

    const contentType = req.headers.get('content-type');
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
    }

    const formData = await req.formData();

    const requiredFields = [
      'companyName',
      'workEmail',
      'phone',
      'businessType',
      'address',
      'contactName',
      'contactMobile',
      'contactEmail',
      'documentType',
      'documentNo',
      'password',
      'agreed',
    ];

    for (const field of requiredFields) {
      if (!formData.get(field)) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    const workEmail = formData.get('workEmail')?.toString()!;
    const existingVendor = await Vendor.findOne({ workEmail });
    if (existingVendor) {
      return NextResponse.json({ error: 'Vendor with this email already exists' }, { status: 409 });
    }

    // Handle file uploads
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    const saveFile = async (file: File | null) => {
      if (!file) return '';
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${file.name}`;
      const filePath = path.join(uploadDir, filename);
      await writeFile(filePath, buffer);
      return `/uploads/${filename}`;
    };

    const logo = await saveFile(formData.get('logo') as File);
    const documentImage = await saveFile(formData.get('documentImage') as File);

    const newVendor = new Vendor({
      companyName: formData.get('companyName'),
      workEmail,
      phone: formData.get('phone'),
      website: formData.get('website') || '',
      businessType: formData.get('businessType'),
      address: formData.get('address'),
      message: formData.get('message') || '',
      logo,
      contactName: formData.get('contactName'),
      contactMobile: formData.get('contactMobile'),
      contactEmail: formData.get('contactEmail'),
      documentType: formData.get('documentType'),
      documentNo: formData.get('documentNo'),
      documentImage,
      password: formData.get('password'),
      agreed: formData.get('agreed') === 'true',
      paid: formData.get('paid') === 'true' || false,
      amount: formData.get('amount') || 0,
    });

    const savedVendor = await newVendor.save();

    const token = jwt.sign({ id: savedVendor._id, email: savedVendor.workEmail }, JWT_SECRET, {
      expiresIn: '7d',
    });
    

    const { password: _, ...vendorData } = savedVendor.toObject();

    return NextResponse.json({ token, vendor: vendorData }, { status: 201 });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
