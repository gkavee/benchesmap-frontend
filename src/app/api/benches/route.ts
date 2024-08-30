import { NextResponse } from 'next/server';
import { getBenches } from '@/lib/server-functions';

export async function GET() {
  try {
    const benches = await getBenches();
    return NextResponse.json(benches);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch benches' }, { status: 500 });
  }
}