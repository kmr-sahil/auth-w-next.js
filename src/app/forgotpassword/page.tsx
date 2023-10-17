import React from 'react'

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-slate-950">
        <h1 className='text-primary'>Submit your mail</h1>
        <p className='text-sec'>we'll send you a link to change your password</p>

        <form action="" className='flex flex-col my-4 items-center'>
          <input type="email" name="" id="email" placeholder='email' className='input' />
          <button className='btn-primary w-[5rem]'>Submit</button>
        </form>
        
    </div>
  )
}
