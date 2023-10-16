"use client"

import axios from "axios"
import Link from "next/link"
import React, {useState, useEffect} from 'react'
import { useRouter } from "next/navigation";

export default function ResetPassword () {
    const router = useRouter();
    const [password, setPassword] = useState({
        oldPassword: '',
        newPassword: '',
        userId: '',
    })

    useEffect(() => {
    const getUserDetails = async () => {
        try {
            const res = await axios.get("/api/users/me")
            console.log(res.data)
            setPassword({...password, userId: res.data.data._id})

        } catch (error: any) {
            console.log(error.message)
        }
        
    }

    getUserDetails()
    },[])

    const onSubmit = async () => {
        try {
            const response = await axios.put('/api/users/resetpassword', password)
            console.log("Login success", response.data);
            router.push("/login")
            
        } catch (error: any) {
            console.log("Password change failed", error.message);
        }
    }


    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-primary">Reset / Change Password</h1>

        <label htmlFor="password" className="label">Old Password</label>
        <input 
        className="input
        "
            id="password"
            type="password"
            value={password.oldPassword}
            onChange={(e) => setPassword({...password, oldPassword: e.target.value})}
            placeholder="old password"
            />

        <label htmlFor="password" className="label">New Password</label>
        <input 
        className="input
        "
            id="password"
            type="password"

            placeholder="new password"
            />

        <label htmlFor="password" className="label">Confirm Password</label>
        <input 
        className="input
        "
            id="password"
            type="password"
            value={password.newPassword}
            onChange={(e) => setPassword({...password, newPassword: e.target.value})}
            placeholder="confirm password"
            />

        <button className="btn-primary" onClick={onSubmit}>Submit</button>
        </div>
    )
}