import React from 'react';
import Link from 'next/link';

function AuthButtons() {
    return (
        <div className='flex gap-2 items-center'>
            <Link href={'/auth/login'}>
                <button className='relative px-2 py-1 bg-green-600 text-white
                    font-semibold rounded-xl overflow-hidden shadow-lg
                    transition-transform hover:scale-105 group cursor-pointer'
                >
                    <span className='absolute inset-0 bg-green-700 opacity-0 group-hover:opacity-100
                        transition-opacity duration-300'>
                    </span>
                    <span className='relative z-10'>Sing In</span>
                </button>
            </Link>
            <Link href={'/auth/create-profile'}>
                <button className='relative px-2 py-1 bg-blue-600 text-white
                    font-semibold rounded-xl overflow-hidden shadow-lg
                    transition-transform hover:scale-105 group cursor-pointer'
                >
                <span className='absolute inset-0 bg-blue-700 opacity-0 group-hover:opacity-100
                    transition-opacity duration-300'>
                </span>
                    <span className='relative z-10'>Sign Up</span>
                </button>
            </Link>
        </div>
    );
}

export default AuthButtons;
