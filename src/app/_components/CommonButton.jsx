import React from 'react'

const Button = ({ value, allFunction }) => {
    return (
        <div>
            <button onClick={() => allFunction()} type='button' className='px-4 py-2 text-white bg-[#ab7a5f] rounded-sm'>{value}</button>
        </div>
    )
}

export default Button