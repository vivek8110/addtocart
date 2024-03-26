"use client"

import { ApolloProvider } from "@apollo/client";
import client from "../apollo/client/client";
import { usePathname,useParams } from 'next/navigation'; // Import usePathname hook
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./_components/navbar/Navbar";
import Footer from "./_components/footer/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname(); // Define pathName using usePathname hook
  // console.log("🚀 ~ file: layout.tsx:14 ~ pathName:",pathName)

  return (
    <html lang="en">
      <body>
        <ApolloProvider client={client}>
          {/* <Navbar/> */}
          {/* <p><Link href="/"> Home</Link> <Link href={`/${pathName?.split('/')[1]}`}> {pathName}</Link></p> */}
          {children}
        <ToastContainer/>
          {/* <Footer/> */}
        </ApolloProvider>
      </body>
    </html>
  );
}
