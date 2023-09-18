"use client";
import Link from "next/link";
import React from 'react';
import { useRouter } from "next/navigation";
import {axios} from "axios";

export default function LoginPage() {

    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const onLogin = async () => {

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 text-slate-950"> 
            <h1 className="text-xl text-white">Sign Up</h1>
            <hr />

            <label htmlFor="email" className="text-white my-2">email</label>
            <input className="rounded-lg px-[0.5rem] py-[0.25rem] text-base"
                type="email" value={user.email}
                id="email"
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="email" />

            <label htmlFor="password" className="my-2 text-white">password</label>
            <input className="rounded-lg px-[0.5rem] py-[0.25rem] text-base"
                type="password" value={user.password}
                id="password"
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password" />

            <button onClick={onLogin} 
                className="bg-white my-4 text-gray-950 px-[1rem] py-[0.5rem] rounded-md">
                Submit</button>

            <Link href="/signup" className="text-white my-2">Visit SignUp page</Link>
        </div>
    )
}