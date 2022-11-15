import React from 'react'

const AdminForm = () => {
  return (
    <div className='flex flex-col gap-4 w-8/12 py-2'>
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

        <button className='bg-[#1FAF38] text-white py-2 px-9 flex items-center w-max rounded-md shadow-md'>Login</button>

    </div>
  )
}

export default AdminForm