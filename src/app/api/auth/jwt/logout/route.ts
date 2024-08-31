import { NextResponse } from 'next/server';
import { logout } from '@/lib/api';
import { errorHandler } from '@/middleware/error-handler';

export async function POST(): Promise<NextResponse> {
    try {
        await logout()
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return errorHandler(error);
      }
}