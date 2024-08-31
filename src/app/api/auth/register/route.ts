import { NextRequest, NextResponse } from 'next/server';
import { register } from '@/lib/api';
import { errorHandler } from '@/middleware/error-handler';

export async function POST(request: NextRequest) {
    try {
        const { username, email, password } = await request.json()
        const response = await register(username, email, password)
        return NextResponse.json(response);
    } catch (error) {
        return errorHandler(error);
      }
}