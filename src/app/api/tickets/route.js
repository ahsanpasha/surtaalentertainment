// src/app/api/tickets/route.js
// Local file-based tickets API (Firebase removed)

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "src", "data", "tickets.json");

// Helper to read data
function getTickets() {
  if (!fs.existsSync(dataFilePath)) return [];
  const fileData = fs.readFileSync(dataFilePath, "utf-8");
  return JSON.parse(fileData || "[]");
}

// Helper to write data
function saveTickets(tickets) {
  fs.writeFileSync(dataFilePath, JSON.stringify(tickets, null, 2), "utf-8");
}

// GET /api/tickets — fetch all tickets
export async function GET() {
  try {
    const tickets = getTickets();
    // Sort by createdAt desc if available
    tickets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return NextResponse.json(tickets, { status: 200 });
  } catch (error) {
    console.error("Error reading tickets:", error);
    return NextResponse.json({ error: "Failed to load tickets" }, { status: 500 });
  }
}

// POST /api/tickets — add a new ticket
export async function POST(req) {
  try {
    const body = await req.json();
    const { artistName, dayNum, month, weekday, city, venue, imageUrl } = body;

    if (!artistName || !dayNum || !month || !city || !venue) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newTicket = {
      id: Date.now().toString(), // simple unique ID
      artistName,
      dayNum,
      month,
      weekday: weekday || "",
      city,
      venue,
      imageUrl: imageUrl || "",
      createdAt: new Date().toISOString(),
    };

    const tickets = getTickets();
    tickets.push(newTicket);
    saveTickets(tickets);

    return NextResponse.json({ success: true, ticket: newTicket }, { status: 201 });
  } catch (error) {
    console.error("Error saving ticket:", error);
    return NextResponse.json({ error: "Failed to save ticket" }, { status: 500 });
  }
}

// DELETE /api/tickets?id=<docId> — delete a ticket
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Ticket ID required" }, { status: 400 });
    }

    let tickets = getTickets();
    tickets = tickets.filter((t) => t.id !== id);
    saveTickets(tickets);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting ticket:", error);
    return NextResponse.json({ error: "Failed to delete ticket" }, { status: 500 });
  }
}
