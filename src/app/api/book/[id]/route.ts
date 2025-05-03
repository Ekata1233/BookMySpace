import { NextResponse } from "next/server";
import testConnection from "@/lib/db";
import BookSpace from "@/models/bookSpace";
import Vendor from "@/models/vendor";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function PUT(request: Request, context: any) {
    await testConnection();

    try {
        const { id } = await context.params;
        const updateData = await request.json();


        const updatedBooking = await BookSpace.findByIdAndUpdate(id, updateData, {
            new: true,
        });

        if (!updatedBooking) {
            return NextResponse.json(
                { success: false, message: "Booking not found for update" },
                { status: 404, headers: corsHeaders },
            );
        }

        return NextResponse.json(
            { success: true, data: updatedBooking },
            { status: 200, headers: corsHeaders },
        );
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 400, headers: corsHeaders },
        );
    }
}


// DELETE - Soft Cancel Booking (set isCancel = true)
export async function DELETE(request: Request, context: any) {
    await testConnection();

    try {
        const { id } = context.params;

        const cancelledBooking = await BookSpace.findByIdAndUpdate(
            id,
            { isCancel: true },
            { new: true },
        );

        if (!cancelledBooking) {
            return NextResponse.json(
                { success: false, message: "Booking not found for delete" },
                { status: 404, headers: corsHeaders },
            );
        }

        return NextResponse.json(
            { success: true, data: cancelledBooking },
            { status: 200, headers: corsHeaders },
        );
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 400, headers: corsHeaders },
        );
    }
}
