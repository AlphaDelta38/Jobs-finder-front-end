import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { JSearchApiResponse } from '@/types/jobs.types'


export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || 'developer';
    const page = searchParams.get('page') || '1';

    const options: AxiosRequestConfig = {
        method: 'GET',
        url: 'https://jsearch.p.rapidapi.com/search',
        params: {
            query,
            page,
            num_pages: '1',
        },
        headers: {
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
        },
    };

    try {
        const response: AxiosResponse<JSearchApiResponse> = await axios.request(options);
        return NextResponse.json(response.data);
    } catch (error: unknown) {
        console.error('Error with getting data', error);
        return NextResponse.json({ error: 'Error with getting data' }, { status: 500 });
    }
}