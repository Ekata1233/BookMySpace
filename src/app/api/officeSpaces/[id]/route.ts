import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/db";
import officeSpaces from "@/models/officeSpaces";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ✅ Handle preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// ✅ GET - Get specific office space by ID
export async function GET(request: Request, context: any) {
  await connectToDatabase();

  try {
    const { id } = context.params;

    const officeSpace = await officeSpaces.findById(id);

    if (!officeSpace || officeSpace.isDeleted) {
      return NextResponse.json(
        { success: false, message: "Office space not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { success: true, data: officeSpace },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400, headers: corsHeaders }
    );
  }
}


// ✅ PUT - Update Box
export async function PUT(request: Request, context: any) {
  await connectToDatabase();

  const { id } = await context.params;  // This needs to be awaited
  console.log("Updating office space with ID:", id);
  try {
    const updateData = await request.json();

    const updatedOfficeSpaces = await officeSpaces.findByIdAndUpdate(
      id,
      { ...updateData },
      { new: true },
    );

    if (!updatedOfficeSpaces) {
      return NextResponse.json(
        { success: false, message: "OfficeSpaces not found" },
        { status: 404, headers: corsHeaders },
      );
    }

    return NextResponse.json(
      { success: true, data: updatedOfficeSpaces },
      { status: 200, headers: corsHeaders },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400, headers: corsHeaders },
    );
  }
}

// ✅ DELETE - Soft Delete Box
// export async function DELETE(request: Request, context: any) {
//   await connectToDatabase();
//   const { id } = await context.params;  // This needs to be awaited
//   console.log("Updating office space with ID:", id);
//   try {

//     const deletedOfficeSpaces = await officeSpaces.findByIdAndUpdate(
//       id,
//       { isDeleted: true },
//       { new: true },
//     );

//     if (!deletedOfficeSpaces) {
//       return NextResponse.json(
//         { success: false, message: "OfficeSpaces not found" },
//         { status: 404, headers: corsHeaders },
//       );
//     }

//     return NextResponse.json(
//       { success: true, data: deletedOfficeSpaces },
//       { status: 200, headers: corsHeaders },
//     );
//   } catch (error: any) {
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 400, headers: corsHeaders },
//     );
//   }
// }


export async function DELETE(request: Request, context: any) {
  await connectToDatabase();
  const { id } = context.params;  // No need to await this line
  console.log("Deleting office space with ID:", id);
  
  try {
    const deletedOfficeSpace = await officeSpaces.findByIdAndDelete(id);

    if (!deletedOfficeSpace) {
      return NextResponse.json(
        { success: false, message: "Office space not found" },
        { status: 404, headers: corsHeaders },
      );
    }

    return NextResponse.json(
      { success: true, data: deletedOfficeSpace },
      { status: 200, headers: corsHeaders },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400, headers: corsHeaders },
    );
  }
}
