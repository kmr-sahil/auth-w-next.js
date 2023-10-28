"use client"
import React from 'react'

export default function SetForgotPassPage() {

    const[pass, setPass] = React.useState("")
    const[confirm, setConfirm] = React.useState("")

    const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

    React.useEffect(() => {
        if (pass.length >= 2 && confirm.length >= 2) {
          setIsButtonDisabled(false);
        } else {
          setIsButtonDisabled(true);
        }
      }, [pass, confirm]);

  const onSubmit = (event:any) => {

    event.preventDefault();
    if (isButtonDisabled) {
      console.log('Disable');
      return; // Return early if the button is disabled
    }
  
    // Handle email submission
    // For now, let's just log the email
    console.log('Submitting form...');

  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-slate-950">
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
