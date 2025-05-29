import {loginTypes, registerTypes } from '@/types/auth-formik-types';
import axios from '@/lib/axios'
import routes from '@/routes';
import { AxiosResponse } from 'axios';
import { authUserResponseType } from '@/types/user.types';

export async function login(loginData: loginTypes){
    try {
        return await axios.post<loginTypes, AxiosResponse<authUserResponseType>>(routes.login, loginData);
    }catch (e){
        throw e
    }
}

export async function register(registerData: registerTypes){
    try {
        return await axios.post<loginTypes, AxiosResponse<authUserResponseType>>(routes.register, registerData);
    }catch (e){
        throw e
    }
}
