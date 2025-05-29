'use client';

import React, {useEffect, useState} from 'react';
import JobCard from '@/components/jobs/JobCard';
import { JobInterface, LikedJobs } from '@/types/jobs.types';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { useAuth } from '@/contexts/AuthProvider';
import Loader from '@/components/Loader';

interface RecommendJobsInterface{
    setLikeToJobHandler: (job: LikedJobs)=> void
    checkJobInLikedList: (id: string)=> boolean
}

function RecommendJobs({ setLikeToJobHandler, checkJobInLikedList }: RecommendJobsInterface){
    const { user} = useAuth()
    const [recommendJobs, setRecommendJobs] = useState<JobInterface[]>([]);

    const {
        data,
        error,
        isLoading,
    } = useSWR(user ? `/api/jobs?query=${user?.desiredJobTitle}` : null, fetcher);

    useEffect(()=>{
        if(data){
            const jobs: JobInterface[] = (data.data || []).map((job: any) => ({
                id: job.job_id,
                title: job.job_title,
                company: job.employer_name,
                location: job.job_city || job.job_country,
                postedAt: job.job_posted_at,
                source: job.job_publisher ?? 'Unknown',
            }));

            setRecommendJobs(jobs)
        }
    }, [data])

    return (
        <section className='mb-8'>
            <h2 className='text-xl font-semibold mb-4'>Recommended Vacancies</h2>

            {isLoading && <Loader />}

            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {recommendJobs.map((job) => (
                    <JobCard
                        key={job.id}
                        job={job}
                        setLike={setLikeToJobHandler}
                        liked={checkJobInLikedList(job.id)}
                    />
                ))}
                {user && recommendJobs.length === 0 && 'Not found yet'}
                {!user && 'Pls Sing In or Sing up for Recommendation'}
            </div>
        </section>
    );
}

export default RecommendJobs;