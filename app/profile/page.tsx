'use client';

import React, {useEffect} from 'react';
import {useAuth} from '@/contexts/AuthProvider';
import {useRouter} from 'next/navigation';

function profile() {
    const { user, logout } = useAuth()
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/');
        }
    }, [user]);

    return (
        <div className='max-w-xl mx-auto mt-10 px-4'>
            <div className='bg-white shadow-xl rounded-2xl p-6 sm:p-8'>
                <h2 className='text-2xl font-semibold text-gray-800 mb-6 text-center'>
                    Profile
                </h2>

                <section className='space-y-5'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Email
                        </label>
                        <input
                            value={user?.email ?? 'Email'}
                            readOnly={true}
                            type='email'
                            placeholder='your@email.com'
                            className='w-full border border-gray-300 rounded-xl
                            px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Name
                        </label>
                        <input
                            value={user?.name ?? 'Name'}
                            readOnly={true}
                            type='text'
                            placeholder='John Doe'
                            className='w-full border border-gray-300 rounded-xl px-4
                            py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            About Me
                        </label>
                        <textarea
                            value={user?.aboutMe ?? 'About me'}
                            readOnly={true}
                            placeholder='Tell us about yourself...'
                            rows={4}
                            className='w-full border border-gray-300 rounded-xl px-4 py-2
                            resize-none focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Desired Job Title
                        </label>
                        <input
                            value={user?.desiredJobTitle ?? 'Desired Job Title'}
                            readOnly={true}
                            type='text'
                            placeholder='Frontend Developer'
                            className='w-full border border-gray-300 rounded-xl px-4 py-2
                            focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    <div className='text-center'>
                        <button onClick={() => logout()}
                            className='mt-4 bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition
                            cursor-pointer'
                        >
                            Log Out
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default profile;