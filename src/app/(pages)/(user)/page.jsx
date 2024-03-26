"use client"
import "../../globals.css"

export default function Home() {
    return (
        <>
            <div className="flex justify-center items-center mt-18 px-10">
                <div className="w-1/2">
                    <span className="text-5xl text-black font-bold text-wrap">
                        Design Your
                        <br />
                        Comfort Zone</span>
                    <p className="leading-loose max-w-lg mt-8">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, at sed omnis corporis doloremque possimus velit! Repudiandae nisi odit, aperiam odio ducimus, obcaecati libero et quia tempora excepturi quis alias?</p>
                    <button
                        className="bg-[#ab7a5f] text-white px-4 py-2 rounded-md shadow-md mt-8"
                    >Shop Now</button>
                </div>

                <div className="pt-10">
                    <img
                        className="rounded-md"
                        src="https://react-course-comfy-sloth-store.netlify.app/static/media/hero-bcg.a876f19f6786a3aca992.jpeg"
                        alt="Hero Image"
                        width={400}
                        height={400} />
                </div>
            </div>
        </>
    );
}
