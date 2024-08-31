import { NextRequest, NextResponse } from 'next/server';
import { login } from '@/lib/api';
import { errorHandler } from '@/middleware/error-handler';

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json()
        const response = await login(username, password)
        return NextResponse.json(response);
    } catch (error) {
        return errorHandler(error);
      }
}