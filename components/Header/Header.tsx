'use client';

import React from 'react';
import Link from 'next/link';
import AuthButtons from '@/components/Header/AuthButtons';
import {useAuth} from '@/contexts/AuthProvider';

function Header() {
    const { user } = useAuth();

    return (
        <header className='flex w-full h-[60px] px-4 max-[500px]:px-0 mb-4'>
            <div className='flex w-full max-w-[1440px] mx-auto justify-between items-center'>
                <div className='flex h-full items-center justify-items-center px-6 max-[500px]:px-2 align-middle'>
                    <Link href=''>
                        <h1 className='text-2xl font-bold text-black cursor-pointer max-[500px]:text-xl'>Job Finder</h1>
                    </Link>
                </div>
                <div className='flex w-[70%] justify-end'>
                    <nav className='max-w-[360px] h-full flex items-center'>
                        <ul className='flex w-full items-center justify-between list-none gap-4'>
                            <Link className='text-base text-black font-medium hover:opacity-75' href={'/jobs'}>
                                Jobs
                            </Link>
                            <Link className='text-base text-black font-medium hover:opacity-75' href={'/liked'}>
                                Liked Jobs
                            </Link>
                            {user ?
                                <Link className='text-base text-black font-medium hover:opacity-75' href={'/profile'}>
                                    Profile
                                </Link>
                                :
                                <AuthButtons />
                            }
                        </ul>
                    </nav>
                    <div></div>
                </div>
            </div>
        </header>
    );
}

export default Header;
