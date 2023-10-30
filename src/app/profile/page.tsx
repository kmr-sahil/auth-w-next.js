"use client";
import React from "react";
import axios from "axios"
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loader from "@/components/Loader";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = React.useState("nothing")
    const[name, setName] = React.useState("")
    const [loading, setLoading] = React.useState(false);

    const onLogout = async() => {
        try {
            setLoading(true)
            await axios.get("/api/users/logout")
            router.push("/login")
            
        } catch (error:any) {
            console.log(error.message)
        } finally {
            setLoading(false)
          }
    }

    const getUserDetails = async () => {
        try {
            setLoading(true)
            const res = await axios.get("/api/users/me")
            console.log(res.data)
            setName(res.data.data.username) 
            setData(res.data.data._id)
            console.log(name)

        } catch (error: any) {
            console.log(error.message)
        } finally {
            setLoading(false)
          }
        
    }

    const resetpassword = () => {
        router.push("/resetpassword")
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 relative">
            {loading && <Loader/>}
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