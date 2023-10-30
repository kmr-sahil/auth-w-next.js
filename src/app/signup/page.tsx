"use client";
import Link from "next/link";
import React from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";
import Loader from "@/components/Loader";

export default function SignUpPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })

    const [loading, setLoading] = React.useState(false)
    const [disabled, setDisabled] = React.useState(false)

    React.useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setDisabled(false)
        }
        else {
            setDisabled(true)
        }
    }, [user])

    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup success", response.data)
            router.push("/login")
            
        } catch (error: any) {
            console.log("Signup failed", error.message)

        } finally{
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 text-slate-950 relative"> 

            {loading && <Loader/>}

            <h1 className="text-primary">{loading ? "Processing" : "Sign Up"}</h1>
            <hr />
            <label htmlFor="username" className="label">username</label>
            <input className="input"
                type="text" value={user.username}
                id="username"
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="username" />

            <label htmlFor="email" className="label">email</label>
            <input className="input"
                type="email" value={user.email}
                id="email"
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="email" />

            <label htmlFor="password" className="label">password</label>
            <input className="input"
                type="password" value={user.password}
                id="password"
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password" />

            <button onClick={onSignup} 
                className="btn-primary">
                {disabled ? "No signup" : "Signup"}</button>
            <Link href="/login" className="btn-primary">Visit login page</Link>
        </div>
    )
}