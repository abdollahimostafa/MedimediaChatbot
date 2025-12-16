// app/api/send-sms/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // use singleton Prisma client
import { sendSMSCode } from "@/lib/sms";

export async function POST(req: Request) {
  try {
    const body: { phone?: string } = await req.json();
    const { phone } = body;

    if (!phone) {
      return NextResponse.json({ error: "Phone required" }, { status: 400 });
    }

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Save code in DB
    await prisma.code.create({
      data: {
        phone,
        code,
        used: false,
        createdAt: new Date(),
      },
    });

    // Send SMS
    await sendSMSCode(phone, code);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("SMS send error:", err);
    return NextResponse.json({ error: "SMS failed" }, { status: 500 });
  }
}
