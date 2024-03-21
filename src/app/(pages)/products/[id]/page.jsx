
"use client"
import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ADD_PRODUCT_TO_CART, GET_PRODUCT_BY_ID } from '../../../../apollo/client/query'
import "../../../globals.css"
import { FaCheck } from 'react-icons/fa';
import CommonButton from "../../../_components/CommonButton"
import { useRouter } from 'next/navigation'

const page = ({ params }) => {
    const id = params.id
    const [image, setImage] = useState(null)
    const [quantity, setQuantity] = useState(1)
    console.log("🚀 ~ file: page.jsx:15 ~ page ~ quantity:", quantity)
    const [productColor, setProductColor] = useState({})
    console.log("🚀 ~ file: page.jsx:16 ~ page ~ productColor:", productColor)
    const [checkedColors, setCheckedColors] = useState({});

    const router = useRouter()
    const [AddProductToCart] = useMutation(ADD_PRODUCT_TO_CART)
    const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, {
        variables: {
            id: id
        }
    })
    const product = data?.getProductById;
    const decreaseQty = () => {

        if (quantity > 0) {
            setQuantity((prev) => prev - 1);
        }


    }
    const increaseQty = () => {
        if (quantity < product.stock) {
            setQuantity((prev) => prev + 1);
        } else {
            alert("u've rechead the max level of quantity ")
        }
    }
    const handleClick = (color) => {
        setProductColor(color)
        setCheckedColors(prevState => ({
            ...prevState,
            [color.id]: !prevState[color.id]
        }));
    }
    const addtoCart = async () => {

        AddProductToCart({
            variables: {
                input: {
                    colorId: productColor.id,
                    image: product.image[0],
                    price: product.price,
                    productId: product.id,
                    quantity: quantity

                }
            }
        }).then(async (res) => {
            alert(res.data.addProductToCart.message)

            await setProductColor({})
            // await setQuantity(1)
            await setCheckedColors({})
            await router.push('/cart')
        }).catch(async (err) => {
            alert(err.message)
            await setProductColor({})
            // await setQuantity(1)
            await setCheckedColors({})
        })

    }
    const goBackToProduct = () => {
        router.back()
    }
    useEffect(() => {
        setImage(product?.image[0])
    }, [data])

    if (loading || !product) return <div>Loading...</div>
    return (
        <>
            <div className="container md:container mx-auto pt-52">
                <div className="p-4">
                    <CommonButton value="Back To Products" allFunction={goBackToProduct} />

                </div>
                <div className="grid grid-cols-2 grid-flow-col 2">
                    <div className="box p-4">
                        <div className='w-full h-[450px] rounded-t-xl'>
                            <img src={image} className='w-full h-full object-cover transform rounded-t-xl' alt="" />

                        </div>
                        <div className="grid grid-cols-5 py-5">
                            {product?.image.map((img, index) => (
                                <div onClick={() => setImage(img)}
                                    key={index}
                                    className={`rounded-md h-20 bg-black ${index === 0 ? 'mr-2' : index === 4 ? 'ml-2' : 'mx-2'} hover:cursor-pointer`}
                                >
                                    <img src={img} className='rounded-md w-full h-full object-cover' alt="" />
                                </div>
                            ))}
                        </div>

                    </div>

                    <div className='p-4 text-gray-900'>
                        <div className='border-b border-b-gray-300 w-full'>
                            <p className='text-5xl font-bold mb-5'>{product?.name}</p>
                            <p className='text-2xl font-bold text-[#ab7a5f] mb-3'> &#x20B9; {product?.price}</p>
                            <p className='leading-loose tracking-normal mb-3'>{product?.description}</p>


                            <div className="flex text-start items-center w-1/2 py-2">
                                <p className='text-base font-bold  w-1/2'>AVAILABLE :</p>
                                <p >{product?.inStock === true ? "true" : "false"}</p>
                            </div>
                            <div className="flex text-start items-center w-1/2 py-2">
                                <p className='text-base font-bold  w-1/2'>SKU :</p>
                                <p >{product?.sku}</p>
                            </div>

                            <div className="flex text-start items-center w-1/2 py-2 pb-4">
                                <p className='text-base font-bold  w-1/2'>BRAND :</p>
                                <p >{product?.brandName?.name}</p>
                            </div>
                        </div>
                        <div>

                            <div className="flex text-start items-center w-1/2 py-3 pb-2 ">
                                <p className='text-base font-bold  w-1/2'>COLORS :</p>
                                {
                                    product?.colors.map((color) => (

                                        <p
                                            key={color.id}
                                            onClick={() => handleClick(color)}
                                            className="h-6 w-6 rounded-full mr-2 flex items-center justify-center"
                                            style={{ backgroundColor: color.hexCode }}
                                        >
                                            {checkedColors[color.id] && <FaCheck />}
                                        </p>
                                    ))
                                }


                            </div>
                            <div className="flex items-center w-1/2 mb-2">
                                <p className='text-base font-bold w-1/2'>QUANTITY :</p>

                                <div className="flex w-1/2">
                                    <button onClick={decreaseQty} className='mx-1 pl-0 p-3 text-lg font-medium' >-</button>
                                    <button className='mx-1 p-3 text-lg font-medium text-black' >{quantity}</button>
                                    <button onClick={increaseQty} className='mx-1 p-3 text-lg font-medium' disabled={quantity >= product.stock}>
                                        +
                                    </button>

                                </div>
                            </div>
                            <CommonButton value="Add To Cart" allFunction={addtoCart} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page