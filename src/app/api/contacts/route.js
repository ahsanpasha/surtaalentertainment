import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const contactsFilePath = path.join(process.cwd(), "data", "contacts.json");

function getContacts() {
  if (!fs.existsSync(contactsFilePath)) {
    return [];
  }
  const fileContent = fs.readFileSync(contactsFilePath, "utf8");
  return JSON.parse(fileContent);
}

export async function GET() {
  try {
    const contacts = getContacts();
    return NextResponse.json(contacts, { status: 200 });
  } catch (error) {
    console.error("Error reading contacts:", error);
    return NextResponse.json({ error: "Failed to load contacts" }, { status: 500 });
  }
}
