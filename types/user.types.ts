import {registerTypes} from '@/types/auth-formik-types';

export type User = Omit<registerTypes, 'password'>

export type authUserResponseType = {
    error?: string;
    message: string
    token: string
}
