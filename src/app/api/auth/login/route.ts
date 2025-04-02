import { AuthService } from "@/services/authService";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const response = await AuthService.login(email, password);

    return NextResponse.json(response, { status: response.status || 200 });
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
