import React from 'react'

import Image from 'next/image'
import failed from '../images/failed.svg'


const AttendanceFailed = () => {
  return (
    <div  className='min-h-screen h-screen w-full items-center justify-center flex flex-col'>
        <Image src={failed} />
        <div className='flex gap-2 flex-col items-center  py-4'>
            <h2 className='text-4xl font-bold '>Ooops...</h2>
            <p className='text-2xl font-bold'>Unable To Record Your Atendance!</p>

            <div className='flex  gap-6'>
                <button className='px-12 rounded-md shadow-xl py-2 bg-[#1FAF38] text-lg font-bold text-white'>BACK</button>

                <button className='px-12 rounded-md shadow-xl py-2 bg-[#1FAF38] text-lg font-bold text-white'>RETRY</button>
            </div>
        </div>
        </div>
  )
}

AttendanceFailed.authRequired = true;

export default AttendanceFailed