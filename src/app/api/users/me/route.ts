import { getMe } from '@/lib/api';
import { NextResponse } from 'next/server';
import { errorHandler } from '@/middleware/error-handler';

export async function GET(): Promise<NextResponse> {
    try {
        const reponse = await getMe();
        console.log(reponse);
        return NextResponse.json(reponse);
    } catch (error) {
      return errorHandler(error);
    }
}