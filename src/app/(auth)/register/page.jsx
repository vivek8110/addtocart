"use client"

import { useState } from "react";
import "../../globals.css"
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../../apollo/client/mutation"
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


export default function Home() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
    });

    const [CreateUser] = useMutation(CREATE_USER)
    const router = useRouter()
    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        CreateUser({
            variables: {
                input: {
                    ...formData, phone: Number(formData.phone)
                }
            }
        }).then(async (res) => {
            console.log("🚀 ~ file: page.jsx:38 ~ handleSubmit ~ res:", res.data.CreateUser.message)
            await router.push('/login')
            toast.success(res.data.CreateUser.message);
        }).catch((err) => {
            console.log("🚀 ~ file: page.jsx:40 ~ handleSubmit ~ err:", err.message)
            toast.error(err.message)

        })
    };
    return (
        <div className="container md:container mx-auto flex justify-center pt-10">
            <div className=" w-1/3 p-6 px-10 text-[#ab7a5f] rounded-lg shadow-2xl border border-gray-200">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <form id="registerForm" className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold ">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={handleInputChange}
                            className="mt-1 block w-full focus:outline-none border border-gray-300 px-2 py-2 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold ">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={handleInputChange}
                            className="mt-1 block w-full focus:outline-none border border-gray-300 px-2 py-2 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-semibold ">Phone</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            onChange={handleInputChange}
                            className="mt-1 block w-full focus:outline-none border border-gray-300 px-2 py-2 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-semibold ">Address</label>
                        <textarea
                            id="address"
                            name="address"
                            rows={3}
                            onChange={handleInputChange}
                            className="mt-1 block w-full focus:outline-none border border-gray-300 px-2 py-2 rounded-md shadow-sm sm:text-sm"
                            defaultValue={""}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold ">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={handleInputChange}
                            className="mt-1 block w-full focus:outline-none border border-gray-300 px-2 py-2 rounded-md shadow-sm sm:text-sm"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full transition-all mt-5 bg-black text-white py-2 px-4 rounded-md hover:bg-[#ab7a5f] focus:outline-none focus:ring-2 focus:ring-[#ab7a5f] focus:ring-opacity-50"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
}
