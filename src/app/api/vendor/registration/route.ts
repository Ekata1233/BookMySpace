import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import testConnection from "@/lib/db";
import Vendor from "@/models/vendor";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";

export async function GET() {
  await testConnection();
  try {
    const vendor = await Vendor.find({});
    return NextResponse.json({ success: true, data: vendor }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  await testConnection();
  const session = await getServerSession(authOptions);

  try {
    const formData = await req.formData();

    const order_id = uuidv4();

    // Extract fields
    const getValue = (key: string) => formData.get(key)?.toString() || "";
    const logo = formData.get("logo") as File | null;

    // Upload directory
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Handle single image
    let logoUrl = "";
    if (logo instanceof File) {
      const bytes = await logo.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filePath = path.join(uploadDir, logo.name);
      await writeFile(filePath, buffer);
      logoUrl = `/uploads/${logo.name}`;
    }

    const documentImage = formData.get("documentImage") as File | null;

    let documentImageUrl = "";
    if (documentImage instanceof File) {
      const bytes = await documentImage.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filePath = path.join(uploadDir, documentImage.name);
      await writeFile(filePath, buffer);
      documentImageUrl = `/uploads/${documentImage.name}`;
    }
    
    // Create order
    const newOrder = new Vendor({
      companyName: getValue("companyName"),
      workEmail: getValue("workEmail"),
      phone: getValue("phone"),
      website: getValue("website"),
      businessType: getValue("businessType"),
      address: getValue("address"),
      message: getValue("message"),
      logo: logoUrl,
      contactName: getValue("contactName"),
      contactMobile: getValue("contactMobile"),
      contactEmail: getValue("contactEmail"),
      documentType: getValue("documentType"),
      documentNo: getValue("documentNo"),
      documentImage: documentImageUrl,
      password: getValue("password"),
      agreed: getValue("agreed") === "true",
      paid: true,
      userId: session?.user?.email || "",
      order_id,
      amount: getValue("amount"),
      status: "pending",
    });

    console.log("Saving Vendor with data:", newOrder);

    await newOrder.save();
    console.log("Vendor saved successfully");

    return NextResponse.json({
      message: "Order created successfully",
      order_id,
    });
  } catch (error) {
    console.error("Error saving vendor:", error);
    return NextResponse.json(
      { error: "Failed to create vendor" },
      { status: 500 }
    );
  }
}
