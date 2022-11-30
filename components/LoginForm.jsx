import Link from 'next/link'
import React from 'react'

const LoginForm = () => {
  return (
    <div className='flex flex-col gap-4 w-8/12 py-2 h-4/6 bg-[#3041DC] rounded-lg text-white px-6'>

      <h1>Good Morning Techy!</h1>
      <div className='h-full w-full flex flex-col justify-center'>
      <label>Student ID</label>
        <input 
        type='text'
        className="w-full p-2 outline-none border-2 border-[#3041DC] rounded-md"
        />

<label>Password</label>
        <input 
        type='password'
        className="w-full p-2 outline-none border-2 border-[#3041DC] rounded-md"
        />

        <div className='w-full  my-4 flex justify-center'>
        <Link href='/studentDashboard'>
        <button className='bg-[#187DF3] text-white py-2 px-9 flex items-center w-max rounded-md shadow-md'>Login</button>
        </Link>
        </div>
       
        
      </div>
      

    </div>
  )
}

export default LoginForm