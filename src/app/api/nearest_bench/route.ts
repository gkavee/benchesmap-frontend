import { NextResponse } from 'next/server';
import { getNearestBench } from '@/lib/api';
import { errorHandler } from '@/middleware/error-handler';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const latitude = parseFloat(searchParams.get('latitude') || '0');
  const longitude = parseFloat(searchParams.get('longitude') || '0');
  
  try {
    const bench = await getNearestBench(latitude, longitude);
    return NextResponse.json(bench);
  } catch (error) {
    return errorHandler(error);
  }
}