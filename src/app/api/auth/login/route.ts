import { AuthService } from "@/services/authService";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const response = await AuthService.login(email, password);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Login Error:", error);
    // return NextResponse.json({ error: "Internal Server Error 1" }, { status: 500 });
  }
}
