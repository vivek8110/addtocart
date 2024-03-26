import Image from 'next/image'
import React from 'react'
const card = ({ product }) => {
  return (

    <>
      <div className='rounded-md shadow-md max-w-xs mx-5 border-1 hover:cursor-pointer'>
        <div className="relative  overflow-hidden mb-4">
          <img src={product?.image[0]} alt="Product Image" className="w-full h-[150px] rounded-t" />
        </div>
        <div className='flex justify-between items-center mx-4'>
          <p className="text-lg font-semibold pb-2">{product?.name}</p>
          <p className="text-gray-700 pb-2">Price</p>
        </div>
      </div>


    </>
  )
}

export default card