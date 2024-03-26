"use client"
import React, { Suspense, useEffect, useState } from 'react'
import ProductCard from "../../../_components/ProductCard"
import "../../../globals.css"
import { GET_ALL_PRODUCTS } from "../../../../apollo/client/query"
import { useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/navigation'
import SideBar from "../../../_components/sideBar/SideBar"
import Loading from '../../../_components/loader/Loading'
const page = () => {
    const [isFreeShippingSelected, setFreeShippingSelected] = useState(false);
    console.log("🚀 ~ file: page.jsx:11 ~ page ~ isFreeShippingSelected:", isFreeShippingSelected)
    const [selectedCategories, setSelectedCategories] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedColors, setSelectedColors] = useState("");
    const [searchTearm, setSearchTearm] = useState("")
    const router = useRouter()

    const { data, error, loading, refetch } = useQuery(GET_ALL_PRODUCTS, {
        variables: {
            input: {
                categories: selectedCategories,
                brands: selectedBrand,
                colors: selectedColors,
                search: searchTearm,
                shipping: isFreeShippingSelected
            }
        }
    })
    const goToTheProduct = (id) => {
        router.push(`products/${id}`)
    }

    const handleFreeShippingSelection = () => {
        setFreeShippingSelected((prev) => !prev);
    };
    const handleCategorySelection = (categoryId) => {
        setSelectedCategories((prev) => {
            if (prev === categoryId) {
                return "";
            } else {
                return categoryId;
            }
        });
    };


    const handleColorSelection = (colorId) => {
        console.log("🚀 ~ file: SideBar.jsx:35 ~ handleColorSelection ~ colorId:", colorId)
        setSelectedColors((prev) => (prev == colorId ? "" : colorId));
    };
    const handleBrandSelection = (brandId) => {
        console.log("🚀 ~ file: SideBar.jsx:35 ~ handleColorSelection ~ colorId:", brandId)
        setSelectedBrand((prev) => (prev == brandId ? "" : brandId));
    };

    return (
        <div className="container md:container mx-auto">
            <div className="flex">
                <div className="w-1/4">

                    <SideBar isFreeShippingSelected={isFreeShippingSelected} selectedColors={selectedColors} selectedBrand={selectedBrand} setSearchTearm={setSearchTearm} selectedCategories={selectedCategories} handleFreeShippingSelection={handleFreeShippingSelection}
                        handleCategorySelection={handleCategorySelection} handleColorSelection={handleColorSelection}
                        handleBrandSelection={handleBrandSelection} />
                </div>

                <div className='w-3/4 grid grid-cols-4 grid-flow-col pt-10'>


                    {data?.getAllProducts && data?.getAllProducts.map((product) => (
                        <div key={product?.id} onClick={() => goToTheProduct(product.id)}>

                            <Suspense fallback={<Loading />}>
                                < ProductCard product={product} />
                            </Suspense>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    )
}

export default page