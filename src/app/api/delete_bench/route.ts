import { NextResponse } from 'next/server';
import { deleteBench } from '@/lib/api';
import { errorHandler } from '@/middleware/error-handler';

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const benchName = searchParams.get('bench_name');
  
  if (!benchName) {
    return NextResponse.json({ error: 'Bench name is required' }, { status: 400 });
  }
  
  try {
    const result = await deleteBench(benchName);
    return NextResponse.json(result);
  } catch (error) {
    return errorHandler(error);
  }
}