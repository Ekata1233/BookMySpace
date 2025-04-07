import { connectToDatabase } from '@/lib/db';
import OfficeTour from '@/models/OfficeTour';
import { NextResponse } from 'next/server';
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import testConnection from "@/lib/db";
import officeSpaces from "@/models/officeSpaces";
import { existsSync } from "fs";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// ✅ Handle preflight requests
export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

// ✅ GET all office tours (excluding deleted ones)
export async function GET() {
    await connectToDatabase();
    try {
        const tours = await OfficeTour.find({});
        return NextResponse.json(
            { success: true, data: tours },
            { status: 200, headers: corsHeaders }
        );
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500, headers: corsHeaders }
        );
    }
}

// ✅ POST a new office tour
export async function POST(req: Request) {
    await connectToDatabase();

    try {
        const formData = await req.formData();
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const file = formData.get('image') as File;

        if (!title || !description || !file) {
            return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });
        }

        const uploadDir = path.join(process.cwd(), "public/uploads");
        if (!existsSync(uploadDir)) {
            console.log("Creating uploads directory...");
            await mkdir(uploadDir, { recursive: true });
        }



        const buffer = Buffer.from(await file.arrayBuffer());
        const filePath = path.join(uploadDir, file.name);
        await writeFile(filePath, buffer);
        const imagePath = `/uploads/${file.name}`;

        const newTour = await OfficeTour.create({ title, description, image: imagePath });
        return NextResponse.json({ success: true, data: newTour }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}