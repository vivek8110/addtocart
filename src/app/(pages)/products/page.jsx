"use client"
import React from 'react'
import ProductCard from "../../_components/ProductCard"
import "../../globals.css"
import { GET_ALL_PRODUCTS } from "../../../apollo/client/query"
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/navigation'
import SideBar from "../../_components/sideBar/SideBar"
const page = () => {
    const router = useRouter()

    const { data, loading, error } = useQuery(GET_ALL_PRODUCTS)
    console.log("🚀 ~ file: page.jsx:10 ~ page ~ data:", data?.getAllProducts)
    if (loading) return <div>Loading...</div>

    const goToTheProduct = (id) => {
        console.log("🚀 ~ file: page.jsx:15 ~ goToTheProduc ~ id:", id)
        router.push(`products/${id}`)

    }
    return (
        <div className="container md:container mx-auto">
            <div className="flex">
                <SideBar />

                <div className='grid grid-cols-4 grid-flow-col pt-10'>

                    {/*  */}
                    {data && data?.getAllProducts?.map((product) => (
                        <div key={product?.id} onClick={() => goToTheProduct(product.id)}>

                            < ProductCard product={product} />
                        </div>

                    ))}
                </div>
            </div>
        </div>
    )
}

export default page