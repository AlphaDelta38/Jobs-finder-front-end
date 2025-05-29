'use client';

import React, { useEffect, useState } from 'react';
import { JobDetailsProps } from '@/types/jobs.types'
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import Loader from '@/components/Loader';

interface PageProps {
    id: string;
}

const JobDetails= ({ id }: PageProps) => {
    const [job, setJob] = useState<JobDetailsProps | null>(null);

    const {
        data,
        error,
        isLoading
    } = useSWR(`/api/job-details?job_id=${id}`, fetcher);


    useEffect(()=>{
        if(data){
            setJob(data.data[0])
        }
    }, [data])


    return (
        <>
            {job && !isLoading ?
                <div className='p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-6'>
                    <div>
                        <h1 className='text-2xl font-bold'>{job.job_title}</h1>
                        <p className='text-gray-700 mt-1'>
                            {job.employer_name} &bull; {job.job_location}, {job?.job_country}
                        </p>
                        <p className='text-sm text-gray-500'>
                            Publicated: {new Date(job.job_posted_at_datetime_utc).toLocaleString()}
                        </p>
                    </div>

                    <div className='space-y-4'>
                        <h2 className='text-lg font-semibold'>Description</h2>
                        <p className='text-gray-800 whitespace-pre-line'>{job.job_description}</p>
                    </div>

                    {job.job_highlights?.Qualifications?.length && (
                        <div>
                            <h3 className='text-lg font-semibold mt-4'>Requirements</h3>
                            <ul className='list-disc list-inside text-gray-700'>
                                {job.job_highlights.Qualifications.map((q, i) => (
                                    <li key={i}>{q}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {job.job_benefits?.length && (
                        <div>
                            <h3 className='text-lg font-semibold mt-4'>Benefits</h3>
                            <ul className='list-disc list-inside text-gray-700'>
                                {job.job_benefits.map((b, i) => (
                                    <li key={i}>{b}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                        <a
                            href={job.job_google_link}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-blue-600 underline text-sm'
                        >
                            Look in Google Jobs
                        </a>
                    </div>

                    <div className='text-sm text-gray-500 mt-6'>
                        Type of employment: {job.job_employment_type} <br/>
                        Remote work: {job.job_is_remote ? 'Да' : 'Нет'} <br/>
                        Employer's website:{' '}
                        <a className='text-blue-500 underline' href={job.employer_website} target='_blank'>
                            {job.employer_website}
                        </a>
                    </div>
                </div>
                :
                <Loader/>
            }
        </>
    );
};

export default JobDetails;
