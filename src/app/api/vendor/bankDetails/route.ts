import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/config";
import VendorBank from "@/models/VendorBank";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function parseForm(req: NextRequest): Promise<{ fields: any; files: any }> {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: false });

    form.parse(req as any, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
}

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { fields, files } = await parseForm(req);

    const {
      vendorId,
      accountHolder,
      accountNumber,
      ifscCode,
      bankName,
      branchName,
    } = fields;

    const file = files.bankDocument;

    if (!file || Array.isArray(file)) {
      return NextResponse.json({ error: "Invalid or missing bank document." }, { status: 400 });
    }

    const fileBuffer = fs.readFileSync(file.filepath);
    const uploaded = await imagekit.upload({
      file: fileBuffer,
      fileName: file.originalFilename || "bank-doc",
    });

    const newDetail = new VendorBank({
      vendorId,
      accountHolder,
      accountNumber,
      ifscCode,
      bankName,
      branchName,
      bankDocument: uploaded.url,
    });

    await newDetail.save();

    return NextResponse.json(
      { message: "Vendor bank detail added successfully", data: newDetail },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error uploading bank detail:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
