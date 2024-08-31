import { NextResponse } from 'next/server';
import { getBenches } from '@/lib/api';
import { errorHandler } from '@/middleware/error-handler';

export async function GET() {
  try {
    const benches = await getBenches();
    return NextResponse.json(benches);
  } catch (error) {
    return errorHandler(error);
  }
}