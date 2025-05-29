'use client';

import React, { useEffect, useState } from 'react';
import { LikedJobs } from '@/types/jobs.types';
import Image from 'next/image';
import Link from 'next/link';

const LikedJobsPage = () => {
    const [likedJobs, setLikedJobs] = useState<LikedJobs[]>([]);

    function deleteFromLike(id: string){
       const likedJobsInput = [...likedJobs].filter(job => job.id !== id);
       setLikedJobs(likedJobsInput);
       localStorage.setItem('liked', JSON.stringify(likedJobsInput));
    }

    useEffect(() => {
        const likedJobs = localStorage.getItem('liked')
        if(likedJobs){
            const parsed = JSON.parse(likedJobs);
            setLikedJobs(parsed)
        }
    }, []);

    return (
        <div className='max-w-4xl mx-auto px-4 py-8'>
            <h1 className='text-2xl font-bold mb-6 text-center'>Liked Jobs</h1>

            {likedJobs.length === 0 ? (<p className='text-center text-gray-500'>No liked jobs found.</p>)
                :
                (
                <ul className='space-y-4'>
                    {likedJobs.map((job) => (
                        <li key={job.id}
                            className='
                                flex items-center justify-between
                                border rounded-lg p-4 shadow hover:shadow-md transition gap-5
                                '
                        >
                            <Link href={`/job-details/${job.id}`}>
                                <h2 className='text-lg font-semibold cursor-pointer'>{job.title}</h2>
                            </Link>
                            <button onClick={() => deleteFromLike(job.id)} className='cursor-pointer'>
                                <Image
                                    src={`/red-heart.png`}
                                    alt='Heart'
                                    width={24}
                                    height={24}
                                    priority
                                />
                            </button>
                        </li>
                    ))}
                </ul>
                )
            }

        </div>
    );
};

export default LikedJobsPage;
