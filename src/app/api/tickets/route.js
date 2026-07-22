// src/app/api/tickets/route.js
// Firestore-backed tickets API — replaces file-based JSON storage

import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

const COLLECTION = "tickets";

// GET /api/tickets — fetch all tickets ordered by creation time
export async function GET() {
  try {
    const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const tickets = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    return NextResponse.json(tickets, { status: 200 });
  } catch (error) {
    console.error("Error reading tickets from Firestore:", error);
    return NextResponse.json({ error: "Failed to load tickets" }, { status: 500 });
  }
}

// POST /api/tickets — add a new ticket
export async function POST(req) {
  try {
    const body = await req.json();
    const { artistName, dayNum, month, weekday, city, venue, imageUrl } = body;

    if (!artistName || !dayNum || !month || !city || !venue) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newTicket = {
      artistName,
      dayNum,
      month,
      weekday: weekday || "",
      city,
      venue,
      imageUrl: imageUrl || "",
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, COLLECTION), newTicket);

    return NextResponse.json(
      { success: true, ticket: { id: docRef.id, ...newTicket } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving ticket to Firestore:", error);
    return NextResponse.json({ error: "Failed to save ticket" }, { status: 500 });
  }
}

// DELETE /api/tickets?id=<docId> — delete a ticket by Firestore doc ID
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Ticket ID required" }, { status: 400 });
    }

    await deleteDoc(doc(db, COLLECTION, id));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting ticket from Firestore:", error);
    return NextResponse.json({ error: "Failed to delete ticket" }, { status: 500 });
  }
}
