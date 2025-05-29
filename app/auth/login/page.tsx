'use client';

import React, {useEffect, useState} from 'react';
import { useFormik  } from 'formik';
import { useRouter } from 'next/navigation';
import { loginTypes } from '@/types/auth-formik-types';
import { AxiosError } from 'axios';
import { formikLoginInitialValues, loginFieldsSettings } from '@/constants/auth.constants';
import { loginValidationSchema } from '@/formik-schemes/auth-validation.schemes';
import InputField from '@/components/AuthUI/InputField';
import { login } from '@/lib/auth';
import { useAuth } from '@/contexts/AuthProvider';


function Login() {
    const {setToken, setUserData, user} = useAuth();
    const router = useRouter();

    const [registerErrors, setRegisterErrors] = useState<string | null>(null)

    const formik = useFormik<loginTypes>({
        initialValues: formikLoginInitialValues,
        validationSchema: loginValidationSchema,
        onSubmit: loginHandler,
    })

    async function loginHandler(values: loginTypes){
        try {
            const response = await login(values)
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
        <form onSubmit={formik.handleSubmit} className='bg-white shadow-md rounded-xl p-6 max-w-md w-full mx-auto mt-10'>
            <h2 className='text-2xl font-bold mb-6 text-center'>Sign In</h2>

            {loginFieldsSettings.map((value)=>
                <InputField
                    placeholder={value.placeholder}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label={value.label}
                    value={formik.values[value.id as keyof loginTypes]}
                    type={value.type}
                    id={value.id}
                    key={value.id}
                />
            )}

            <div className='flex flex-col items-start justify-start gap-2 mb-4'>
                {Object.entries(formik.errors).map(([field, error]) => (
                    <span key={field} style={{ color: 'red' }}>{error}</span>
                ))}
                {
                    registerErrors && <span style={{color: 'red'}}>{registerErrors}</span>
                }
            </div>

            <button
                type='submit'
                className='w-full bg-green-600 hover:bg-green-700 text-white font-semibold
                py-2 rounded-lg shadow-md transition duration-300 cursor-pointer'
            >
                Sign In
            </button>
        </form>
    );
}

export default Login;
