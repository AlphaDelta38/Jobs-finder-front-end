import React from 'react';
import {JobInterface, LikedJobs} from '@/types/jobs.types';
import Link from 'next/link';
import Image from 'next/image'

interface JobCardInterface{
    job: JobInterface
    liked: boolean,
    setLike: (job: LikedJobs) => void;
}

function JobCard({ job, setLike, liked }: JobCardInterface) {
    return (
        <div className='border rounded-lg p-4 shadow hover:shadow-md
        transition bg-white flex flex-col justify-between h-full'
        >
            <div>
                <h3 className='text-lg font-bold mb-1'>{job.title}</h3>
                <p className='text-sm text-gray-600'>{job.company}</p>
                <p className='text-sm text-gray-600'>{job.location}</p>
            </div>
            <div className='mt-4 text-sm text-gray-500 flex justify-between items-center'>
                <span>{job.postedAt ?? 'Unknown'}</span>
                <span className='italic'>{job.source}</span>
            </div>
            <div className='flex w-full items-center justify-between mt-5'>
                <Link href={`/job-details/${job.id}`}>
                    <button
                        className='mt-3 inline-block px-4 py-2 bg-blue-600
                        text-white text-sm rounded-lg hover:bg-blue-700 transition cursor-pointer'
                    >
                        More Details
                    </button>
                </Link>
                <button onClick={()=>setLike({id: job.id, title: job.title})} className='cursor-pointer'>
                    <Image
                        src={`/${liked ? 'red' : 'gray'}-heart.png`}
                        alt='Heart'
                        width={24}
                        height={24}
                        priority
                    />
                </button>
            </div>
        </div>
    );
}

export default JobCard;
