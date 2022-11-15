import React from 'react'


import Image from 'next/image'
import success from '../images/success.svg'


const AttendanceSuccessful = () => {
    return (
        <div  className='min-h-screen h-screen w-full items-center justify-center flex flex-col'>
            <Image src={success} />
            <div className='flex gap-2 flex-col items-center  py-4'>
                <h2 className='text-4xl font-bold '>Attendance Successful</h2>
                <p className='text-2xl font-bold'>Please Go in to your class</p>
    
              
                    <button className='px-12 rounded-md shadow-xl py-2 bg-[#1FAF38] text-lg font-bold text-white'>OKAY!</button>
            
            </div>
            </div>
  )
}

export default AttendanceSuccessful