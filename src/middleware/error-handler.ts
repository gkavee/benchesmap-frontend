import { CustomError } from '@/types';
import { NextResponse } from 'next/server';

export function errorHandler(err: any) {
    const error: CustomError = {
        status_code: err.response?.status || 500,
        detail: err.response?.data?.detail || err.message || 'Unknown error',
        error_code: err.response?.data?.error_code,
    };
    return NextResponse.json({ error }, { status: error.status_code });
}
