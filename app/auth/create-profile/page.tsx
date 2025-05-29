'use client';

import React, {useEffect, useState} from 'react';
import { useFormik } from 'formik';
import { AxiosError } from 'axios';
import InputField from '@/components/AuthUI/InputField';
import { formikRegisterInitialValues, registerFieldsSettings } from '@/constants/auth.constants'
import { registerValidationSchema } from '@/formik-schemes/auth-validation.schemes'
import { registerTypes } from '@/types/auth-formik-types'
import { register } from '@/lib/auth'
import { useAuth } from '@/contexts/AuthProvider';
import {useRouter} from 'next/navigation';

function Register() {
    const {setToken, setUserData, user} = useAuth();
    const router = useRouter();

    const [registerErrors, setRegisterErrors] = useState<string | null>(null)

    const formik = useFormik<registerTypes>({
        initialValues: formikRegisterInitialValues,
        validationSchema: registerValidationSchema,
        onSubmit: registerHandler
    })

    async function registerHandler(values: registerTypes){
        try {
            const response = await register(values)
            if(response && response.data?.token){
                setToken(response.data.token)
                setUserData(response.data.token)
            }

        }catch (e){
            const error = e as AxiosError<{ details?: any }>;
            if(e && error.response?.data.details){
                setRegisterErrors(error.response?.data.details)
            }else{
                setRegisterErrors(null)
            }
        }
    }

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user]);

    return (
        <form onSubmit={formik.handleSubmit}
              className='bg-white shadow-md rounded-xl p-6 max-w-md w-full mx-auto mt-10 transition'>
            <h2 className='text-2xl font-bold mb-6 text-center'>Sign Up</h2>

            {registerFieldsSettings.map((value) =>
                <InputField
                    placeholder={value.placeholder}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label={value.label}
                    value={formik.values[value.id as keyof registerTypes]}
                    type={value.type}
                    id={value.id}
                    key={value.id}
                />
            )}

            <div className='mb-4'>
                <label className='block text-gray-700 font-medium mb-2' htmlFor={'aboutMe'}>
                    About you
                </label>
                <textarea
                    id= 'aboutMe'
                    placeholder='text about you'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.aboutMe}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[120px]'
                />
            </div>

            <div className='flex flex-col items-start justify-start gap-2 mb-4'>
                {Object.entries(formik.errors).map(([field, error]) => (
                    <span key={field} style={{color: 'red'}}>{error}</span>
                ))}
                {
                    registerErrors && <span style={{color: 'red'}}>{registerErrors}</span>
                }
            </div>

            <button
                type='submit'
                className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold
                py-2 rounded-lg shadow-md transition duration-300 cursor-pointer'
            >
                Sign Up
            </button>
        </form>
    );
}

export default Register;
