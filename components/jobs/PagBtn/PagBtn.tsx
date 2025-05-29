import React from 'react';

interface PagBtnPInterface {
    number: number
}

function PagBtn({ number }:PagBtnPInterface) {
    return (
        <button className='text-white px-4 py-2 rounded-lg bg-blue-900
            hover:bg-blue-700 text-sm sm:text-base cursor-pointer'
        >
            {number}
        </button>
    );
}

export default PagBtn;
