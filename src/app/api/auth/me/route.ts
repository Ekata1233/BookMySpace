// /app/api/auth/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/user";
import { connectToDatabase } from "@/lib/db";

const SECRET_KEY = process.env.JWT_SECRET as string;

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1]; // Bearer token

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const decoded = jwt.verify(token, SECRET_KEY) as any;
    await connectToDatabase();

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Get User Error:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
