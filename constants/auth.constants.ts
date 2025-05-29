import {inputFieldsInterface} from '@/components/AuthUI/InputField/InputField';

export const formikRegisterInitialValues = {
    email: '',
    password: '',
    name: '',
    desiredJobTitle: '',
    aboutMe: ''
}

export const formikLoginInitialValues = {
    email: '',
    password: ''
}

type registerFieldsSettingsInterface = Omit<inputFieldsInterface, 'onChange' | 'onBlur' | 'value'>

export const registerFieldsSettings: registerFieldsSettingsInterface[] = [
    {id: 'email', label: 'Email', type: 'email', placeholder: 'example@gmail.com'},
    {id: 'password', label: 'Password', type: 'password', placeholder: '*********'},
    {id: 'name', label: 'Name', type: 'text', placeholder: 'Johan'},
    {id: 'desiredJobTitle', label: 'Desired Job Title', type: 'text', placeholder: 'Front-end developer'}
]

export const loginFieldsSettings: registerFieldsSettingsInterface[] = [
    {id: 'email', label: 'Email', type: 'email', placeholder: 'example@gmail.com'},
    {id: 'password', label: 'Password', type: 'password', placeholder: '*********'}
]
