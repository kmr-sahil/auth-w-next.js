"use client";
import React from "react";
import axios from "axios"
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = React.useState("nothing")

    const onLogout = async() => {
        try {
            await axios.get("/api/users/logout")
            router.push("/login")
            
        } catch (error:any) {
            console.log(error.message)
        }
    }

    const getUserDetails = async () => {
        try {
            const res = await axios.get("/api/users/me")
            console.log(res.data)
            setData(res.data.data._id)

        } catch (error: any) {
            console.log(error.message)
        }
        
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2>
            <hr />
            <button onClick={onLogout} className="bg-white my-4 text-gray-950 px-[1rem] py-[0.5rem] rounded-md">LogOut</button>
            <hr />
            <button onClick={getUserDetails} className="bg-white my-4 text-gray-950 px-[1rem] py-[0.5rem] rounded-md">Get Details</button>
        </div>
    )
}