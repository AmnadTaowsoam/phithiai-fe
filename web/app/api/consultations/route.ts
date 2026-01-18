import { NextResponse } from 'next/server';
import { z } from 'zod';

const consultationSchema = z.object({
  fullName: z.string().min(2, 'Please provide a name.'),
  email: z.string().email('A valid email is required.'),
  phone: z.string().optional(),
  eventDate: z.string().optional(),
  vision: z.string().min(10, 'Share a little more about your ceremony vision.'),
  investmentRange: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = consultationSchema.parse(body);

    const endpoint = process.env.CONSULTATION_ENDPOINT;
    if (!endpoint) {
      console.info('CONSULTATION_ENDPOINT not set. Captured payload for manual follow-up:', data);
      return NextResponse.json({ success: true, message: 'Captured locally (no endpoint configured).' });
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: 'phithiai-web',
        ...data,
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Consultation endpoint responded with error:', errorText);
      return NextResponse.json(
        { success: false, message: 'Unable to reach concierge service. Please try again shortly.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.errors[0]?.message ?? 'Invalid input provided.' },
        { status: 400 },
      );
    }

    console.error('Unhandled consultation submission error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong while processing your request. Please try again later.',
      },
      { status: 500 },
    );
  }
}
