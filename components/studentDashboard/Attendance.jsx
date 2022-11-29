import React from 'react'
import Image from 'next/image'
import Chart from '../../images/chart.svg'


const Attendance = () => {
  return (
    <div className='shadow rounded-md border-2 border-[green] w-5/12 p-4 '>
          <h1 className='text-[#187DF3] font-bold text-2xl'>Attendance Insight</h1>

          <div className='w-full flex flex-col items-center'>
            <Image src={Chart} />


            <div className="flex flex-col gap-4 mt-10">

            <div className="flex items-center text-sm gap-2">
            <div className='h-4 w-4 bg-[#33B35F]'></div>
            <p>Number of days Present</p>
            </div>

            <div className="flex items-center text-sm gap-2">
            <div className='h-4 w-4 bg-[#B33352]'></div>
            <p>Number of days Absent</p>
            </div>


            </div>
           
       
            </div>


            <div className="flex w-full flex-col gap-4 items-center mt-10">

            <button className='bg-[#187DF3] text-white py-2 px-9 flex items-center w-max rounded-md shadow-md'>Clock In</button>

<button className='bg-[#1FAF38] text-white py-2 px-9 flex items-center w-max rounded-md shadow-md'>Clock Out</button>

            </div>
</div>
  )
}

export default Attendance