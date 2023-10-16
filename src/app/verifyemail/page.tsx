"use client" 

import axios from "axios"
import { set } from "mongoose";
import Link from "next/link"
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", {token})
            setVerified(true)
            
        } catch (error:any) {
            setError(true);
            console.log(error.message);
            
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
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-primary">Verify Email</h1>
            <h2 className="text-gray-300 bg-gray-700 rounded-md px-4 py-2">{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div>
                    <h2 className="text-gray-300 bg-gray-700 rounded-md px-4 py-2 my-4">Email Verified</h2>
                    <Link href="/login" className="btn-primary">
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 px-4 py-2 rounded-md text-black my-4">Error</h2>
                    
                </div>
            )}
        </div>
    )
}