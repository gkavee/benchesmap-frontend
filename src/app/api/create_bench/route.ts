import { NextResponse } from 'next/server';
import { createBench } from '@/lib/api';
import { errorHandler } from '@/middleware/error-handler';

export async function POST(request: Request) {
  try {
    const benchData = await request.json();
    const newBench = await createBench(benchData);
    return NextResponse.json(newBench);
  } catch (error) {
    return errorHandler(error);
  }
}