import React from 'react'
import event from '../../images/events.svg'
import Image from 'next/image'
import print from '../../images/printer.svg'
import logout from '../../images/logout.svg'
import Link from 'next/link'

const Sidebar = ({setAdminAction, adminAction}) => {


  return (
    <div className='shadow w-full  shadow-lg flex flex-col p-4 rounded-md cursor-pointer'>

        <div className='flex flex-col gap-4 mt-6 ml-4'>
            <div className={`flex gap-2 ${adminAction === 'Events Tab' ? 'border-2 border-[blue] p-2': ''}`} onClick={() => {setAdminAction('Events Tab')} }>
                <Image src={event} />
                <p>Events</p>
            </div>

            <div className={`flex gap-2 ${adminAction === 'Attendance Tab' ? 'border-2 border-[blue] p-2': ''}`} onClick={() => {setAdminAction('Attendance Tab')} }>
                <Image src={print} />
                <p>Print Attendance</p>
            </div>

            <Link href="/admin">
            <div className='flex gap-2'>
                <Image src={logout} />
                <p>Logout</p>
            </div>
            </Link>
           
            </div> 
       </div>
  )
}

export default Sidebar