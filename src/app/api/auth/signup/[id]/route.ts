import { AuthService } from "@/services/authService";
import { NextRequest, NextResponse } from "next/server";

// CORS helper
function withCors(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return response;
}

// Extract ID from URL
function getIdFromUrl(req: NextRequest): string | null {
  const id = req.nextUrl.pathname.split("/").pop();
  return id || null;
}

export async function GET(req: NextRequest) {
  const id = getIdFromUrl(req);
  if (!id) return withCors(NextResponse.json({ error: "ID not found" }, { status: 400 }));

  try {
    const user = await AuthService.getUserById(id);
    if (!user) {
      return withCors(NextResponse.json({ error: "User not found" }, { status: 404 }));
    }
    return withCors(NextResponse.json(user, { status: 200 }));
  } catch (error) {
    console.error("Get User Error:", error);
    return withCors(NextResponse.json({ error: "Internal Server Error" }, { status: 500 }));
  }
}

export async function PUT(req: NextRequest) {
  const id = getIdFromUrl(req);
  if (!id) return withCors(NextResponse.json({ error: "ID not found" }, { status: 400 }));

  try {
    const updatedData = await req.json();
    const updatedUser = await AuthService.updateUser(id, updatedData);
    return withCors(NextResponse.json(updatedUser, { status: 200 }));
  } catch (error) {
    console.error("Update User Error:", error);
    return withCors(NextResponse.json({ error: "Internal Server Error" }, { status: 500 }));
  }
}

export async function DELETE(req: NextRequest) {
  const id = getIdFromUrl(req);
  if (!id) return withCors(NextResponse.json({ error: "ID not found" }, { status: 400 }));

  try {
    const deletedUser = await AuthService.deleteUser(id);
    return withCors(NextResponse.json({ message: "User deleted", deletedUser }, { status: 200 }));
  } catch (error) {
    console.error("Delete User Error:", error);
    return withCors(NextResponse.json({ error: "Internal Server Error" }, { status: 500 }));
  }
}

export async function OPTIONS() {
  return withCors(new NextResponse(null, { status: 204 }));
}
