import { NextResponse } from 'next/server';
import { getBench } from '@/lib/api';
import { errorHandler } from '@/middleware/error-handler';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const bench = await getBench(parseInt(params.id));
    return NextResponse.json(bench);
  } catch (error) {
    return errorHandler(error);

  }
}