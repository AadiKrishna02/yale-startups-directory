export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';

export async function GET() {
  // Temporary minimal response for debugging
  return NextResponse.json({ message: "CAS callback route is recognized!" });
}