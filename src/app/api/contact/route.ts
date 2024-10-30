import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { ContactPayload } from "./contacType";

// Helper to sanitize user input
function sanitizeInput(input: string) {
  return input.replace(/[<>&'"]/g, function (char) {
    const charMap: { [key: string]: string } = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return charMap[char] || char;
  });
}

// Function to send email
async function sendEmail({
  fullName,
  phoneNumber,
  email,
  subject,
  message,
}: ContactPayload) {
  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Gmail SMTP server
    port: 465, // Secure SMTP port
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail app-specific password
    },
  });

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: email, // Recipient email (company inbox)
    subject: `New Contact Request: ${subject}`,
    text: `You have a new contact request.\n\nName: ${fullName}\nPhone: ${phoneNumber}\nEmail: ${email}\nMessage:\n${message}`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { fullName, phoneNumber, email, subject, message } = body;

    if (!fullName)
      return NextResponse.json(
        { error: "Full name is required." },
        { status: 400 },
      );
    if (!phoneNumber)
      return NextResponse.json(
        { error: "Phone number is required." },
        { status: 400 },
      );

    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return NextResponse.json(
        { error: "Invalid phone number format." },
        { status: 400 },
      );
    }

    if (!email)
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 },
      );

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 },
      );
    }

    if (!subject)
      return NextResponse.json(
        { error: "Subject is required." },
        { status: 400 },
      );
    if (!message)
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 },
      );

    // Sanitize inputs
    const sanitizedData = {
      fullName: sanitizeInput(fullName),
      phoneNumber: sanitizeInput(phoneNumber),
      email: sanitizeInput(email),
      subject: sanitizeInput(subject),
      message: sanitizeInput(message),
    };

    // Send the email with the sanitized data
    await sendEmail(sanitizedData);

    // Return success response
    return NextResponse.json(
      { message: "Message submitted and email sent successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 },
    );
  }
}
