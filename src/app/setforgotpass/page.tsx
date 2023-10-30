"use client"
import axios from 'axios'
import React from 'react'
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

export default function SetForgotPassPage() {

    const router = useRouter();
    const[token, setToken] = React.useState("")
    const[pass, setPass] = React.useState("")
    const[confirm, setConfirm] = React.useState("")
    const [loading, setLoading] = React.useState(false);

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

    React.useEffect(() => {
        if (pass.length >= 2 && confirm.length >= 2) {
          setIsButtonDisabled(false);
        } else {
          setIsButtonDisabled(true);
        }
      }, [pass, confirm]);

      React.useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "")
    },[])


    const onSubmit = async (event: any) => {
      event.preventDefault();
      if (isButtonDisabled) {
        console.log('Button is disabled');
        return;
      }
    
      try {
        setLoading(true)
        await axios.post("api/users/setforgotpass", { token, pass });
        console.log("Password Changed Succesfully")
        router.push("/login")
      } catch (error: any) {
        console.log('Error:', error.message);
      }
      finally {
        setLoading(false)
      }
    };
    

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-slate-950 relative">
      {loading && <Loader/>}
        <h1 className='text-primary'>Set New Password</h1>

        <form action="" className='flex flex-col my-4 items-center'>
            <label htmlFor="password" className="label">Create New Password</label>
          <input type="password" name="" id="password" placeholder='email' value={pass} onChange={(e) => setPass(e.target.value)} className='input' />
          <label htmlFor="re-enter" className="label">Re-Enter new Password</label>
          <input type="password" name="" id="re-enter" placeholder='email' value={confirm} onChange={(e) => setConfirm(e.target.value)} className='input' />
          <button onClick={onSubmit} id='btn' className={`btn-primary w-[5rem] ${isButtonDisabled ? 'cursor-not-allowed opacity-50' : ''}`}>Submit</button>
        </form>
        
    </div>
  )
}
