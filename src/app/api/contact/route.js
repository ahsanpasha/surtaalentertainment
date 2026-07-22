import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { fullName, email, phone, message } = body;

    if (!fullName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });
        
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: "ahsanfiazpasha@gmail.com",
          subject: `New Contact Form Submission from ${fullName}`,
          text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
          html: `<h3>New Contact Form Submission</h3><p><strong>Name:</strong> ${fullName}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`,
        };

        await transporter.sendMail(mailOptions);
      } else {
        console.warn("Email credentials missing. Skipping email, but saving to JSON.");
      }
    } catch (mailErr) {
      console.error("Mail sending failed:", mailErr);
      // Proceed to save to JSON even if mail fails
    }

    // Save to contacts.json
    const fs = require("fs");
    const path = require("path");
    const contactsFilePath = path.join(process.cwd(), "data", "contacts.json");
    
    let contacts = [];
    if (fs.existsSync(contactsFilePath)) {
      contacts = JSON.parse(fs.readFileSync(contactsFilePath, "utf8"));
    }
    
    contacts.push({
      id: Date.now().toString(),
      fullName,
      email,
      phone,
      message,
      date: new Date().toISOString()
    });
    
    fs.writeFileSync(contactsFilePath, JSON.stringify(contacts, null, 2));

    return NextResponse.json({ success: true, message: "Email sent and saved successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
