// src/app/api/route/route.ts
import { NextResponse } from 'next/server';
import testConnection from '@/lib/db';

// The handler function to check MongoDB connection
export async function GET() {
  try {
    const result = await testConnection();
    
    if (result.success) {
      return NextResponse.json({ message: result.message }, { status: 200 });
    } else {
      return NextResponse.json({ message: result.message }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
