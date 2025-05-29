'use client';

import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import JobCard from '@/components/jobs/JobCard';
import {JobInterface, LikedJobs} from '@/types/jobs.types'
import PagBtn from '@/components/jobs/PagBtn';
import Loader from '@/components/Loader';
import fetcher from '@/lib/fetcher';
import {useAuth} from '@/contexts/AuthProvider';
import RecommendJobs from "@/components/RecommendJobs";

function JobsPage() {
    const [query, setQuery] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<JobInterface[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [likedJobs, setLikedJobs] = useState<LikedJobs[]>([])

    const { user} = useAuth()

    const {
        data,
        error,
        isLoading
    } = useSWR(`/api/jobs?query=${encodeURIComponent(searchQuery)}&page=${currentPage}`, fetcher);


    function setSearchQueryHandler() {
        setSearchResults([])
        setSearchQuery(query)
    }

    function changeCurrentPage(currentPage: number, type: 'left' | 'right') {
        if(currentPage > 0 && type === 'left') {
            setCurrentPage(currentPage - 1)
        }else if(currentPage > 0 && type === 'right'){
            setCurrentPage(currentPage + 1)
        }
    }

    function setLikeToJobHandler(job: LikedJobs){
        let likedJobsInput = [...likedJobs]

        if(!likedJobs){
            const likedJobsString = localStorage.getItem('liked')
            if(likedJobsString){
                likedJobsInput = JSON.parse(likedJobsString)
            }

        }

        const alreadyLiked = likedJobsInput.some(item => item.id === job.id);

        if (alreadyLiked) {
            likedJobsInput = likedJobsInput.filter(item => item.id !== job.id);
        } else {
            likedJobsInput.push(job);
        }

        localStorage.setItem('liked', JSON.stringify(likedJobsInput));
        setLikedJobs(likedJobsInput)
    }

    function checkJobInLikedList(id: string){
        return likedJobs.some(item => item.id === id)
    }


    useEffect(()=>{
        if(data){
            console.log(data)
            const jobs: JobInterface[] = (data.data || []).map((job: any) => ({
                id: job.job_id,
                title: job.job_title,
                company: job.employer_name,
                location: job.job_city || job.job_country,
                postedAt: job.job_posted_at,
                source: job.job_publisher ?? 'Unknown',
            }));

            setSearchResults(jobs);
        }
    }, [data])


    useEffect(() => {
        const likedJobs = localStorage.getItem('liked')
        if(likedJobs){
            const parsed = JSON.parse(likedJobs);
            setLikedJobs(parsed)
        }
    }, []);


    return (
        <div className='p-4 max-w-7xl mx-auto'>
            <h1 className='text-2xl font-bold mb-4 text-center'>Job Search</h1>

            <div className='flex flex-col sm:flex-row gap-2 mb-6'>
                <input
                    type='text'
                    placeholder='Введите название должности...'
                    className='flex-1 px-4 py-2 border rounded-md'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button
                    onClick={()=>setSearchQueryHandler()}
                    className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer'
                >
                    Search
                </button>
            </div>

            <RecommendJobs
                checkJobInLikedList={checkJobInLikedList}
                setLikeToJobHandler={setLikeToJobHandler}
            />

            <section>
                <h2 className='text-xl font-semibold mb-4'>Search Result</h2>
                {searchResults.length === 0 ? (
                    <p className='text-gray-500'>Nothing not found. Try again.</p>
                ) : (
                    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                        {searchResults.map((job) => (
                            <JobCard
                                key={job.id}
                                job={job}
                                setLike={setLikeToJobHandler}
                                liked={checkJobInLikedList(job.id)}
                            />
                        ))}
                    </div>
                )}
            </section>

            {isLoading && <Loader />}

            <div className='flex flex-wrap justify-center gap-2 mt-6'>
                <button
                    onClick={()=>changeCurrentPage(currentPage, 'left')}
                    className='px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm sm:text-base cursor-pointer'
                >
                   Previous
                </button>
                <PagBtn number={currentPage}/>
                <button
                    onClick={()=>changeCurrentPage(currentPage, 'right')}
                    className='px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm sm:text-base cursor-pointer'
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default JobsPage;
