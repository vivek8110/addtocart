'use client';

import { useQuery } from '@apollo/client';
import React, { useEffect, useState, useCallback } from 'react';
import { GET_ALL_CATEGORIES, GET_ALL_BRANDS, GET_ALL_COLORS } from '../../../apollo/client/query';
import "../../globals.css"

const SideBar = () => {

    const [selectedCategories, setSelectedCategories] = useState({});
    const [selectedBrand, setSelectedBrand] = useState({});
    const [selectedColors, setSelectedColors] = useState([]);

    const { data: categoryData } = useQuery(GET_ALL_CATEGORIES);
    console.log("🚀 ~ SideBar ~ categoryData:", categoryData)
    const { data: brandData } = useQuery(GET_ALL_BRANDS);
    console.log("🚀 ~ SideBar ~ brandData:", brandData)
    const { data: colorsData } = useQuery(GET_ALL_COLORS);
    console.log("🚀 ~ SideBar ~ colorsData:", colorsData?.getAllColors)

    const [isFreeShippingSelected, setFreeShippingSelected] = useState(false);

    const handleFreeShippingSelection = () => {
        setFreeShippingSelected((prev) => !prev);
    };

    const handleColor = useCallback((index) => {
        setSelectedColors((prev) => {
            const updatedColors = [...prev];
            updatedColors[index] = {
                ...updatedColors[index],
                isSelected: !updatedColors[index].isSelected,
                color: 'maroon',
            };
            return updatedColors;
        });
    }, []);

    const handleCategorySelection = (categoryId) => {
        setSelectedCategories((prev) => {
            const updatedCategories = { ...prev };
            updatedCategories[categoryId] = !prev[categoryId];
            return updatedCategories;
        });
    };

    const handleBrandSelection = (brandId) => {
        setSelectedBrand((prev) => {
            const updatedBrand = { ...prev };
            updatedBrand[brandId] = !prev[brandId];
            return updatedBrand;
        });
    };

    return (
        <div className='px-5 pt-10 min-h-[86.5vh] bg-blue-900'>
            <input
                type="text"
                placeholder='Search'
                className="border rounded py-2 px-3" />

            {categoryData ? (
                <>
                    <p className="text-xl font-bold mt-4">Categories</p>
                    {categoryData?.getAllCategory?.map((cdata) => (
                        <div key={cdata.id}>
                            <input
                                type="checkbox"
                                id={`category-${cdata.id}`}
                                onChange={() => handleCategorySelection(cdata.id)}
                                checked={selectedCategories[cdata.id] || false}
                            />
                            <label htmlFor={`category-${cdata.id}`} className="ml-2">
                                {cdata.name}
                            </label>
                        </div>
                    ))}
                </>
            ) : (
                <h1>Loading categories...</h1>
            )}
            {brandData ? (
                <>
                    <p className="text-xl font-bold mt-4">Brand</p>
                    {brandData?.getAllBrands?.map((bdata, index) => (
                        <div key={index}>
                            <input
                                type="checkbox"
                                id={`brand-${bdata.id}`}
                                onChange={() => handleBrandSelection(bdata.id)}
                                checked={selectedBrand[bdata.id] || false}
                            />
                            <label htmlFor={`brand-${bdata.id}`} className="ml-2">
                                {bdata.name}
                            </label>
                        </div>
                    ))}
                </>
            ) : (
                <h1>Loading brands...</h1>
            )}

            {colorsData ? (
                <>
                    <p className="text-xl font-bold mt-4">Colors</p>
                    <div className="flex gap-2">
                        {colorsData?.getAllColors?.map((color, index) => (
                            <div
                                key={index}
                                onClick={() => handleColor(index)}
                                className="w-5 h-5 relative bg-white rounded-full p-2"
                                style={{ backgroundColor: color.hexCode }}
                            >
                                {color.isSelected && (
                                    <>
                                        <div className="w-10 h-10 relative bg-white rounded-full p-2"
                                            style={{ backgroundColor: color.hexCode }}></div>
                                        <svg
                                            className="text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            style={{ width: '60%', height: '60%' }}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            )
                : <h1>loading...</h1>}

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
        </div>

    );
};

export default SideBar;
