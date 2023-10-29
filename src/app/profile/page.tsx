"use client";
import React from "react";
import axios from "axios"
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = React.useState("nothing")
    const[name, setName] = React.useState("")

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
            setName(res.data.data.username) 
            setData(res.data.data._id)
            console.log(name)

        } catch (error: any) {
            console.log(error.message)
        }
        
    }

    const resetpassword = () => {
        router.push("/resetpassword")
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-primary">Profile</h1>
            <hr />
            <h2 className="label text-center">{data === 'nothing' ? `Click "get details" to get username ` : <Link href={`/profile/${data}`}>Hii {name}
            </Link>}</h2>
            <hr />
            <button onClick={onLogout} className="btn-primary">LogOut</button>
            <hr />
            <button onClick={getUserDetails} className="btn-primary">Get Details</button>
            <button onClick={resetpassword} className="btn-primary">Change Password</button>
        </div>
    )
}