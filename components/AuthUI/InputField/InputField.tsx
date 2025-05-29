import React, {HTMLInputTypeAttribute} from 'react';

export interface inputFieldsInterface{
    label: string;
    placeholder: string;
    type: HTMLInputTypeAttribute;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

function InputField({label, id, type, placeholder, onChange, onBlur, value}: inputFieldsInterface) {
    return (
        <div className='mb-4'>
            <label className='block text-gray-700 font-medium mb-2' htmlFor={type}>
                {label}
            </label>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
        </div>
    );
}

export default InputField;
