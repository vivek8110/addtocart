'use client';

import { useQuery } from '@apollo/client';
import React, { useEffect, useState, useCallback } from 'react';
import { GET_ALL_CATEGORIES, GET_ALL_BRANDS, GET_ALL_COLORS } from '../../../apollo/client/query';
import "../../globals.css"
import { FaCheck } from 'react-icons/fa';
import Loading from '../loader/Loading';

const SideBar = ({ handleFreeShippingSelection, isFreeShippingSelected,
    handleCategorySelection, handleColorSelection,
    handleBrandSelection, selectedColors, selectedBrand, setSearchTearm, selectedCategories }) => {




    const { data: categoryData } = useQuery(GET_ALL_CATEGORIES);
    const { data: brandData } = useQuery(GET_ALL_BRANDS);
    const { data: colorsData } = useQuery(GET_ALL_COLORS);



    return (
        <div className='px-5 pt-10 min-h-[86.5vh] sticky top-0 left-0'>
            <input
                onChange={(e) => setSearchTearm(e.target.value)}
                type="text"
                placeholder='Search'
                className="border rounded py-2 px-3" />

            {categoryData ? (
                <>
                    <p className="text-xl font-bold mt-4">Categories</p>
                    {categoryData?.getAllCategory?.map((cdata) => (
                        <div key={cdata.id}>

                            <p
                                className={`text-lg capitalize text-gray-600 font-semibold hover:text-gray-700 transition-all hover:cursor-pointer`}
                                style={{
                                    borderBottom: `2px solid rgba(51, 51, 51, ${selectedCategories === cdata.id ? 1 : 0})`,

                                }}

                            >
                                <span onClick={() => handleCategorySelection(cdata?.id)}>{cdata?.name}</span>
                            </p>


                        </div>
                    ))}
                </>
            ) : (
                // <Loading />
                <></>
            )}
            {brandData ? (
                <>
                    <p className="text-xl font-bold mt-4">Brand</p>
                    {brandData?.getAllBrands?.map((bdata, index) => (
                        <div key={index}>
                            <div key={bdata.id}>

                                <p
                                    className={`text-lg capitalize text-gray-600 font-semibold hover:text-gray-700 transition-all hover:cursor-pointer`}
                                    style={{
                                        borderBottom: `2px solid rgba(51, 51, 51, ${selectedBrand === bdata.id ? 1 : 0})`,

                                    }}

                                >
                                    <span onClick={() => handleBrandSelection(bdata?.id)} >{bdata?.name}</span>
                                </p>


                            </div>
                        </div>
                    ))}
                </>
            ) : (
                // <Loading />
                <></>
            )}

            {colorsData ? (
                <div className='mb-5'>
                    <p className="text-xl font-bold mt-4 mb-2">Colors</p>
                    <div className="grid grid-cols-5 gap-2">
                        {colorsData?.getAllColors?.map((color, index) => (
                            <p
                                key={color.id}
                                onClick={() => handleColorSelection(color?.id)}
                                className="h-6 w-6 rounded-full  flex items-center justify-center border border-gray-400 "
                                style={{ backgroundColor: color.hexCode }}
                            >
                                <FaCheck
                                    style={{
                                        color: '#BEBEBE',
                                        fontSize: '11px',
                                        opacity: selectedColors === color.id ? 1 : 0,
                                        visibility: selectedColors === color.id ? 'visible' : 'hidden',
                                    }}
                                />


                            </p>
                        ))}
                    </div>
                </div>
            ) :
                // <Loading />
                <></>
            }

            {/* <p className="text-xl font-bold mt-4">Free Shipping</p> */}
            <div>
                <label htmlFor="free-shipping" className="mr-2 text-xl font-bold mt-4">
                    Free Shipping
                </label>
                <input
                    type="checkbox"
                    id="free-shipping"
                    onChange={handleFreeShippingSelection}
                    checked={isFreeShippingSelected}
                />

            </div>
        </div >

    );
};

export default SideBar;
