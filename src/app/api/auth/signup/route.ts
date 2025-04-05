// src/app/api/auth/signup/route.ts
import { AuthService } from "@/services/authService";
import { NextRequest, NextResponse } from "next/server";

// Helper to add CORS headers
function withCors(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return response;
}

// POST: Signup
export async function POST(req: Request) {
  try {
    const userData = await req.json();
    const response = await AuthService.signup(userData);
    return withCors(
      NextResponse.json(response, { status: response.status || 201 })
    );
  } catch (error) {
    console.error("Signup Error:", error);
    return withCors(
      NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    );
  }
}

// GET: Fetch All Users
export async function GET() {
  try {
    const users = await AuthService.getAllUsers();
    return withCors(NextResponse.json(users, { status: 200 }));
  } catch (error) {
    console.error("Fetch Users Error:", error);
    return withCors(
      NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    );
  }
}

// OPTIONS: Preflight for CORS
export async function OPTIONS() {
  return withCors(new NextResponse(null, { status: 204 }));
}
