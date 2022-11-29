import React from 'react'
import event from '../../images/events.svg'
import Image from 'next/image'

const Sidebar = () => {
  return (
    <div className='shadow w-full h-4/6  shadow-lg flex flex-col p-4 rounded-md'>

        <div className='flex flex-col gap-2 mt-6 ml-4'>
            <div className='flex gap-2'>
                <Image src={event} />
                <p>Events</p>
            </div>
            </div> 
       </div>
  )
}

export default Sidebar