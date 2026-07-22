import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ticketsFilePath = path.join(process.cwd(), "data", "tickets.json");

function getTickets() {
  if (!fs.existsSync(ticketsFilePath)) {
    return [];
  }
  const fileContent = fs.readFileSync(ticketsFilePath, "utf8");
  return JSON.parse(fileContent);
}

function saveTickets(tickets) {
  fs.writeFileSync(ticketsFilePath, JSON.stringify(tickets, null, 2));
}

export async function GET() {
  try {
    const tickets = getTickets();
    return NextResponse.json(tickets, { status: 200 });
  } catch (error) {
    console.error("Error reading tickets:", error);
    return NextResponse.json({ error: "Failed to load tickets" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const tickets = getTickets();
    
    const newTicket = {
      id: Date.now().toString(),
      ...body
    };

    tickets.push(newTicket);
    saveTickets(tickets);

    return NextResponse.json({ success: true, ticket: newTicket }, { status: 201 });
  } catch (error) {
    console.error("Error saving ticket:", error);
    return NextResponse.json({ error: "Failed to save ticket" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: "Ticket ID required" }, { status: 400 });
    }

    let tickets = getTickets();
    tickets = tickets.filter(t => t.id !== id);
    saveTickets(tickets);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting ticket:", error);
    return NextResponse.json({ error: "Failed to delete ticket" }, { status: 500 });
  }
}
