"use client" 

import axios from "axios"

import Link from "next/link"
import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader";

export default function VerifyEmailPage() {
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            setLoading(true)
            await axios.post("/api/users/verifyemail", {token})
            setVerified(true)
            
        } catch (error:any) {
            setError(true);
            console.log(error.message);  
        } finally {
            setLoading(false)
          }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "")
    })

    useEffect(() => {
        if(token.length > 0){
            verifyUserEmail()
        }
    }, [token])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 relative">

            {loading && <Loader/>}

            <h1 className="text-primary">Verify Email</h1>
            <h2 className="text-gray-300 bg-[#1e1e21ce] rounded-md px-4 py-2">{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div className="flex flex-col justify-center items-center">
                    <h2 className="text-gray-300 bg-[#276021c7] rounded-md px-4 py-2 my-5">Email Verified</h2>
                    <Link href="/login" className="btn-primary">
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div className="flex flex-col justify-center items-center">
                    <h2 className="text-gray-300 bg-[#602125c7] rounded-md px-4 py-2 my-5">Error</h2>
                    <Link href="/login" className="btn-primary">
                        Login
                    </Link>
                </div>
            )}
        </div>
    )
}