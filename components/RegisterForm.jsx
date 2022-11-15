import React from 'react'

const RegisterForm = () => {
  return (
    <div className='flex flex-col gap-4 w-8/12 py-2 h-4/6 bg-[#3041DC] rounded-lg text-white px-6'>
    

      <div className='h-full w-full flex flex-col justify-center'>
      <label>Full name</label>
        <input 
        type='text'
        className="w-full p-2 outline-none border-2 border-[#3041DC] rounded-md"
        />

      <label>Student ID</label>
        <input 
        type='text'
        className="w-full p-2 outline-none border-2 border-[#3041DC] rounded-md"
        />

<label>Course</label>
        <input 
        type='text'
        className="w-full p-2 outline-none border-2 border-[#3041DC] rounded-md"
        />

<label>Password</label>
        <input 
        type='password'
        className="w-full p-2 outline-none border-2 border-[#3041DC] rounded-md"
        />

        <button className='bg-[#187DF3] text-white py-2 px-9 flex items-center mx-auto mt-[3rem] rounded-md shadow-md'>Register</button>

      </div>
       
    </div>
  )
}

export default RegisterForm