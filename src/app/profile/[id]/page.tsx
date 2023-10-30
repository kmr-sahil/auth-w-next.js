"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/Loader";

export default function UserProfile({ params }: any) {

    const [loading, setLoading] = React.useState(false);
    const [userData, setUserData] = useState({
        email: "",
        username: "",
        _id: "",
        password: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await axios.get("/api/users/me");
                setUserData(res.data.data);
    
            } catch (error:any) {
                console.log("API Error:", error.message);
            } finally {
                setLoading(false)
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 relative">

            {loading && <Loader/>}
            <h1 className="text-primary">Profile Details</h1>
            <hr />

            
            <div className="w-[30rem] p-[1rem] btn-primary">
                <p >Email: <span className="underline underline-offset-2">{userData.email}</span></p>
                <p >Username: <span className="underline underline-offset-2">{userData.username}</span></p>
                <p >ID: <span className="underline underline-offset-2">{userData._id}</span></p>
                <p className="truncate">Hashed Password: <span className="underline underline-offset-2">{userData.password}</span></p>
            </div>
        </div>
    );
}
