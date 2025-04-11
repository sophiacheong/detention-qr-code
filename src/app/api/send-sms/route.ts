import { NextResponse } from 'next/server';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const fromPhone = process.env.TWILIO_PHONE_NUMBER!;

const client = twilio(accountSid, authToken);

export async function POST(request: Request) {
  const { to, message } = await request.json();

  if (!to || !message) {
    return NextResponse.json({ error: 'Missing "to" or "message" in body' }, { status: 400 });
  }

  try {
    const response = await client.messages.create({
      body: message,
      from: fromPhone,
      to,
    });

    return NextResponse.json({ success: true, sid: response.sid });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}