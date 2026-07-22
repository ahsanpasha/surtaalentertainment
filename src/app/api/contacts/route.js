// src/app/api/contacts/route.js
// Mock contacts GET API — for admin dashboard (Firebase removed)

import { NextResponse } from "next/server";

// GET /api/contacts — fetch all contact submissions
export async function GET() {
  try {
    // Return empty array since database was removed
    return NextResponse.json([], { status: 200 });
  } catch (error) {
    console.error("Error reading contacts:", error);
    return NextResponse.json({ error: "Failed to load contacts" }, { status: 500 });
  }
}
