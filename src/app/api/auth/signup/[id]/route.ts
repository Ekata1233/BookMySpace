import { AuthService } from "@/services/authService";
import { NextRequest, NextResponse } from "next/server";

// Helper to add CORS headers
function withCors(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  );
  return response;
}

// GET: Get a particular user by ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await AuthService.getUserById(params.id);
    if (!user) {
      return withCors(NextResponse.json({ error: "User not found" }, { status: 404 }));
    }
    return withCors(NextResponse.json(user, { status: 200 }));
  } catch (error) {
    console.error("Get User Error:", error);
    return withCors(NextResponse.json({ error: "Internal Server Error" }, { status: 500 }));
  }
}

// PUT: Update a user by ID
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const updatedData = await req.json();
    const updatedUser = await AuthService.updateUser(params.id, updatedData);
    return withCors(NextResponse.json(updatedUser, { status: 200 }));
  } catch (error) {
    console.error("Update User Error:", error);
    return withCors(NextResponse.json({ error: "Internal Server Error" }, { status: 500 }));
  }
}

// DELETE: Delete a user by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const deletedUser = await AuthService.deleteUser(params.id);
    return withCors(NextResponse.json({ message: "User deleted", deletedUser }, { status: 200 }));
  } catch (error) {
    console.error("Delete User Error:", error);
    return withCors(NextResponse.json({ error: "Internal Server Error" }, { status: 500 }));
  }
}

// OPTIONS: Preflight for CORS
export async function OPTIONS() {
  return withCors(new NextResponse(null, { status: 204 }));
}
