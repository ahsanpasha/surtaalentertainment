// src/app/api/contacts/route.js
// Firestore-backed contacts GET API — for admin dashboard

import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const COLLECTION = "contacts";

// GET /api/contacts — fetch all contact submissions ordered by newest first
export async function GET() {
  try {
    const q = query(collection(db, COLLECTION), orderBy("date", "desc"));
    const snapshot = await getDocs(q);
    const contacts = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    return NextResponse.json(contacts, { status: 200 });
  } catch (error) {
    console.error("Error reading contacts from Firestore:", error);
    return NextResponse.json({ error: "Failed to load contacts" }, { status: 500 });
  }
}
