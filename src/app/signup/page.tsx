"use client";
import Link from "next/link";
import React from 'react';
import { useRouter } from "next/navigation";
import {axios} from "axios";

export default function SignUpPage() {

    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })

    const onSignup = async () => {

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 text-slate-950"> 
            <h1 className="text-xl text-white">Sign Up</h1>
            <hr />
            <label htmlFor="username" className="text-white">username</label>
            <input className="rounded-lg px-[0.5rem] py-[0.25rem] text-base"
                type="text" value={user.username}
                id="username"
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="username" />

            <label htmlFor="email" className="text-white">email</label>
            <input className="rounded-lg px-[0.5rem] py-[0.25rem] text-base"
                type="email" value={user.email}
                id="email"
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="email" />

            <label htmlFor="password" className="text-white">password</label>
            <input className="rounded-lg px-[0.5rem] py-[0.25rem] text-base"
                type="password" value={user.password}
                id="password"
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password" />

            <button onClick={onSignup} 
                className="bg-white mt-[1rem] text-gray-950 px-[1rem] py-[0.5rem] rounded-md">
                Submit</button>
            <Link href="/login" className="text-white">Visit login page</Link>
        </div>
    )
}