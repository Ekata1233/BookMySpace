import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import OfficeTour from '@/models/OfficeTour';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const tour = await OfficeTour.findById(params.id);
  if (!tour || tour.isDeleted) {
    return NextResponse.json({ success: false, message: 'Not found' }, { status: 404, headers: corsHeaders });
  }
  return NextResponse.json({ success: true, data: tour }, { headers: corsHeaders });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const data = await request.json();
  const updated = await OfficeTour.findByIdAndUpdate(params.id, data, { new: true });
  if (!updated) {
    return NextResponse.json({ success: false, message: 'Not found' }, { status: 404, headers: corsHeaders });
  }
  return NextResponse.json({ success: true, data: updated }, { headers: corsHeaders });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const deleted = await OfficeTour.findByIdAndUpdate(params.id, { isDeleted: true }, { new: true });
  if (!deleted) {
    return NextResponse.json({ success: false, message: 'Not found' }, { status: 404, headers: corsHeaders });
  }
  return NextResponse.json({ success: true, data: deleted }, { headers: corsHeaders });
}
