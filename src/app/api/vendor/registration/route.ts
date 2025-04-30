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
      agreed: formData.get('agreed') === 'true' || formData.get('agreed') === true,
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
