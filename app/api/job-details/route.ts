import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const job_id = searchParams.get('job_id');
    const country = searchParams.get('country') || 'us';

    if (!job_id) {
        return NextResponse.json({ error: 'Missing job_id' }, { status: 400 });
    }

    try {
        const response = await axios.request({
            method: 'GET',
            url: 'https://jsearch.p.rapidapi.com/job-details',
            params: { job_id, country },
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '',
                'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
            },
        });

        return NextResponse.json(response.data);
    } catch (error) {
        console.error('Error fetching job details:', error);
        return NextResponse.json({ error: 'Failed to fetch job details' }, { status: 500 });
    }
}