"use client"

import React from 'react'
import { useRouter } from "next/navigation";
import  axios  from "axios";
import Loader from "@/components/Loader";

export default function ForgotPasswordPage() {

  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("")
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

  React.useEffect(() => {
    setIsButtonDisabled(email.length <= 2);
  }, [email]);

  const emailSubmit = async (event:any) => {
    event.preventDefault();
    if (isButtonDisabled) {
      console.log('Disable:', email);
      return; // Return early if the button is disabled
    }
  
    // Handle email submission
    // For now, let's just log the email
    
    try{
      setLoading(true)
      const response = await axios.post("/api/users/forgotpassword", { email: email })
      console.log("mail send successfully", response.data)
    } catch(error:any){
      console.log("mail send Unsuccessfully", error.message)
    }
    finally {
      setLoading(false)
    }

  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-slate-950 relative">

        {loading && <Loader/>}

        <h1 className='text-primary'>Submit your mail</h1>
        <p className='text-sec'>we'll send you a link to change your password</p>

        <form action="" className='flex flex-col my-4 items-center'>
          <input type="email" name="" id="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} className='input' />
          <button onClick={emailSubmit} id='btn' className={`btn-primary w-[5rem] ${isButtonDisabled ? 'cursor-not-allowed opacity-50' : ''}`}>Submit</button>
        </form>
        
    </div>
  )
}
