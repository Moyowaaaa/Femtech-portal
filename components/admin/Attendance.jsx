import React from 'react'
import Attach from '../../images/attach.svg'
import Picture from '../../images/pictures.svg'
import Format from '../../images/format.svg'
import Image from 'next/image'
import Share from '../../images/share.svg'
import Print from '../../images/print.svg'
const Attendance = () => {
  return (
    <div className='shadow rounded-md w-full flex flex-col justify-between  h-screen '>
    <div className='w-full flex flex-col p-4 h-4/5'>
    <div className='w-full h-full border-2 rounded-lg resize-none p-2 flex flex-col  placeholder:text-center placeholder:absolute placeholder:top-50  '
    placeholder='Click here to type...'
    ></div>
    </div>
  
    <div className='event-options w-full   py-2'>
      <div className='flex justify-evenly  py-2 px-4'>


      <button className='bg-[#187DF3] text-white py-4 px-9 flex items-center w-max rounded-md shadow-md items-center gap-2'><Image src={Share} />
      Share Attendance</button>

<button className='bg-[#1FAF38] text-white py-2 px-9 flex items-center w-max rounded-md shadow-md items-center gap-2'>
    <Image src={Print}/>
    Print Attendance</button>

      </div>
   
    </div>
    </div>
  )
}

export default Attendance