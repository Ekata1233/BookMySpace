// src/app/api/testConnection/route.ts

import testConnection from "@/lib/db";

export async function GET() {
  const result = await testConnection();

  if (result.success) {
    return new Response(JSON.stringify({ message: result.message }), {
      status: 200,
    });
  } else {
    return new Response(JSON.stringify({ message: result.message }), {
      status: 500,
    });
  }
}
