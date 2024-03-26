"use client"
import React, { useEffect, useState } from 'react';
import "../../../globals.css"
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { GET_ALL_ADD_TO_CART_PRODUCT, REMOVE_PRODUCT_FROM_CART, UPDATE_QUANTITY_OF_PRODUCT_IN_CART } from '../../../../apollo/client/query';
import { DELETE_USERS_CART } from "../../../../apollo/client/mutation"
import { useRouter } from 'next/navigation';
import Button from '../../../_components/CommonButton';

const page = () => {
    const [productsFromCart, setProductsFromCart] = useState()
    const [updatedQuantity, setUpdatedQuantity] = useState()
    const [totalPrice, setTotalPrice] = useState()
    const [shippingCharge, setShippingCharge] = useState(10)

    const [UpdateQtyOfProduct] = useMutation(UPDATE_QUANTITY_OF_PRODUCT_IN_CART)
    const [RemoveFromCart] = useMutation(REMOVE_PRODUCT_FROM_CART)
    const [DeleteCart] = useMutation(DELETE_USERS_CART)
    const [GetAllAddToCartProducts, { data, loading, error, refetch }] = useLazyQuery(GET_ALL_ADD_TO_CART_PRODUCT, { fetchPolicy: "network-only" });
    const router = useRouter()

    const decreaseQty = (product) => {
        const productId = product.productId.id;
        const colorId = product.colorId.id;
        const decreaseProductQty = productsFromCart.map((cartProduct) => {
            if (cartProduct.productId.id === productId && cartProduct.colorId.id === colorId) {
                const newQuantity = Math.max(cartProduct.quantity - 1, 1);
                setUpdatedQuantity(newQuantity - 1)
                return { ...cartProduct, quantity: newQuantity };
            }
            return cartProduct;
        });
        console.log("🚀 ~ file: page.jsx:29 ~ decreaseProductQty ~ decreaseProductQty:",)
        setProductsFromCart(decreaseProductQty);
        updateTotalPrice(decreaseProductQty);
        UpdateQtyOfProduct({
            variables: {
                input: {
                    productId, colorId, quantity: updatedQuantity
                }
            }
        })
    };

    const increaseQty = (product) => {
        const productId = product.productId.id;
        const colorId = product.colorId.id;
        const increaseProductQty = productsFromCart.map((cartProduct) => {
            if (cartProduct?.productId?.id === productId && cartProduct?.colorId.id === colorId) {
                const newQuantity = Math.min(cartProduct.quantity + 1, cartProduct.productId.stock);
                setUpdatedQuantity(newQuantity + 1)
                if (newQuantity === cartProduct.productId.stock) {
                    alert("You have reached the maximum quantity for this product.");
                }
                return { ...cartProduct, quantity: newQuantity };
            }
            return cartProduct;
        });
        console.log("🚀 ~ file: page.jsx:54 ~ increaseProductQty ~ increaseProductQty:", increaseProductQty)
        setProductsFromCart(increaseProductQty);
        updateTotalPrice(increaseProductQty);


        UpdateQtyOfProduct({
            variables: {
                input: {
                    productId, colorId, quantity: updatedQuantity
                }
            }
        })
    };

    const updateTotalPrice = (updatedProducts) => {
        let sum = 0;
        updatedProducts.forEach((product) => {
            sum += product.price * product.quantity;
        });
        setTotalPrice(sum);
    };
    const removeProductFromCart = (id) => {
        RemoveFromCart({
            variables: {

                removeFromCartId: id

            }
        }).then(async (res) => {
            console.log(res.data.removeFromCart.message);
            const updatedCart = await productsFromCart.filter((product) => product.id !== id);
            setProductsFromCart(updatedCart)
        }).catch((err) => {
            console.log("🚀 ~ file: page.jsx:55 ~ removeProductFromCart ~ err:", err.message)


        })
        console.log("🚀 ~ file: page.jsx:45 ~ removeProductFromCart ~ id:", typeof id)

    }
    const goToProductPage = (id) => {
        router.push(`/products/${id}`)
    }

    const continueToShopping = () => {
        router.push('/products')
    }
    const clearCart = () => {
        DeleteCart().then((res) => {
            console.log("🚀 ~ file: page.jsx:108 ~ DeleteCart ~ e:", res)
            refetch()
        }).catch((err) => {
            console.log("🚀 ~ file: page.jsx:111 ~ DeleteCart ~ err:", err)


        })
    }
    useEffect(() => {
        GetAllAddToCartProducts().then((res) => {

            setProductsFromCart(res?.data?.getAllAddToCartProducts || []);

            // Calculate total price when products are fetched
            let sum = 0;
            res?.data?.getAllAddToCartProducts?.forEach((product) => {
                sum += product.price * product.quantity;
            });
            console.log("Total price:", sum);
            setTotalPrice(sum);
        });
    }, [data]);
    if (!productsFromCart) return <div>Loading...</div>;
    return (
        <div className="pt-10 container mx-auto md:container">

            {/* <p className="py-20">{totalPrice}</p> */}
            <table className="min-w-full divide-y divide-gray-200 text-center border border-gray-200 mb-10">
                <thead>
                    <tr>
                        <th className="px-6 text-center py-3 bg-gray-50  text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 text-center py-3 bg-gray-50  text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 text-center py-3 bg-gray-50  text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th className="px-6 text-center py-3 bg-gray-50  text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Subtotal </th>
                        <th className="px-6 text-center py-3 bg-gray-50  text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Actions </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {
                        productsFromCart && productsFromCart.map((product) => (

                            <tr key={product.id}>
                                <td className="px-6 py-4 whitespace-no-wrap">

                                    <span className='flex items-center justify-center'>

                                        <img src={product?.image} onClick={() => goToProductPage(product?.productId?.id)} className='w-20 h-20 rounded-lg hover:cursor-pointer' alt="" />
                                        <div className="flex flex-col mx-3">
                                            <span className=''>{product?.productId?.name}</span>
                                            <div className="flex items-center">
                                                <span>color :</span>
                                                <span
                                                    className="h-4 w-4 rounded-full ml-2 flex items-center justify-center"
                                                    style={{ backgroundColor: product?.colorId?.hexCode }}
                                                >
                                                </span>
                                            </div>
                                        </div>
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap">$ {product.price}</td>
                                <td>
                                    <button onClick={() => decreaseQty(product)} className='mx-1 pl-0 p-3 text-lg font-medium' >-</button>
                                    <button className='mx-1 p-3 text-lg font-medium text-black' >{product?.quantity}</button>
                                    <button onClick={() => increaseQty(product)} className='mx-1 p-3 text-lg font-medium' >+</button>

                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap">$ {product.quantity * product.price} </td>
                                <td className="px-6 py-4 whitespace-no-wrap">
                                    <button onClick={() => removeProductFromCart(product.id)}>delete</button>
                                </td>
                            </tr>
                        ))

                    }

                </tbody>
            </table >

            <div className="flex justify-between items-center">
                <Button value="continue Shopping" allFunction={continueToShopping} />
                <Button value="clear Cart" allFunction={clearCart} />
            </div>
            <div className='mt-10 mb-5 px-5 ml-auto w-[30%] border border-gray-200 text-center p-2'>
                <div className='border-b border-b-gray-200 pb-4'>
                    <div className="flex text-start items-center py-2">
                        <p className='text-base font-bold w-1/2  '>SUBTOTAL :</p>
                        <p >$ {totalPrice}</p>
                    </div>
                    <div className="flex text-start items-center py-2">
                        <p className='text-base font-bold w-1/2  '>SHIPPING CHARGE :</p>
                        <p >$ {shippingCharge}</p>
                    </div>
                </div>
                <div className="flex text-start items-center py-2">
                    <p className='text-lg font-bold w-1/2  '>TOTAL AMOUNT :</p>
                    <p >$ {totalPrice + shippingCharge}</p>
                </div>



            </div>
            <div className="w-[30%] mb-10 ml-auto mt-1">
                <button className='w-full px-4 py-2 text-white bg-[#ab7a5f] rounded-sm'>Place Order</button>
            </div>
        </div>

    );
};

export default page;
