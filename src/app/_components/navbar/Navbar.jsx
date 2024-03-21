'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const logo = require('../../../../public/logo.svg');

const Navbar = () => {
    const isUserLogin = localStorage.getItem('accessToken');

    const logoutUser = () => {
        localStorage.removeItem('accessToken');
    };

    return (
        <div className="bg-gray-200 sticky top-0 left-0 z-50 shadow-md">
            <nav className="flex justify-between items-center container mx-auto py-4 md:conatiner">
                <div>
                    <Image src={logo} alt="Logo" width={180} />
                </div>
                <ul className='flex text-md text-black '>
                    <li className="mr-10 text-lg hover:underline pb-1 tracking-widest"><Link href="/">Home</Link></li>
                    <li className="mr-10 text-lg hover:underline pb-1 tracking-widest"><Link href="/about">About</Link></li>
                    <li className="mr-10 text-lg hover:underline pb-1 tracking-widest"><Link href="/products">Product</Link></li>
                </ul>
                <ul className='flex items-center text-2xl font-medium text-black'>
                    <li className="px-2">
                        <Link href="/cart">
                            Cart

                        </Link>
                    </li>
                    <li className="relative px-2">
                        <span >
                            <svg stroke="currentColor" className='h-6 w-6' fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"></path>
                            </svg>
                            <span className="absolute  -right-1 h-5 w-5 flex justify-center items-center text-white -top-2 rounded-full py-1 px-2  bg-[#9b6041]  text-xs">1</span>
                        </span>
                    </li>
                    {isUserLogin ?
                        <li className="px-2"><button onClick={logoutUser} className="text-[#ab7b60]  hover:text-[#ab7b60] ">Logout</button></li>
                        :
                        <li className="px-2">
                            <Link href="/login" className='flex items-center gap-2'>
                                Login
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>
                            </Link>
                        </li>}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;