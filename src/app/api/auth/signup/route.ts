import { AuthService } from "@/services/authService";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const userData = await req.json();
    const response = await AuthService.signup(userData);

    return NextResponse.json(response, { status: response.status || 201 });
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
export async function GET() {
  try {
    const users = await AuthService.getAllUsers(); // Make sure this method exists
    return NextResponse.json({ users });
  } catch (error) {
    console.error("Fetch Users Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}