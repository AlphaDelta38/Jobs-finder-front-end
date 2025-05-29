import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),

    password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/\d/, 'Password must contain at least one number')
        .matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
        .required('Password is required'),
})


export const registerValidationSchema = loginValidationSchema.shape({
    name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be less than 50 characters')
        .required('Name is required'),

    desiredJobTitle: Yup.string()
        .min(2, 'Job title must be at least 2 characters')
        .max(150, 'Job title must be less than 150 characters')
        .required('Job title is required'),

    aboutMe: Yup.string()
        .min(10, 'About Me must be at least 10 characters')
        .max(1000, 'About Me must be less than 1000 characters')
        .notRequired(),
});
