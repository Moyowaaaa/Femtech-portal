import React from 'react'
import Image from 'next/image'
import instructor from '../../images/instructor.svg'
import profile from '../../images/profile.svg'
import attendance from '../../images/attendance.svg'


const Menu = () => {
  return (
    <div className='shadow w-2/12   shadow-lg flex flex-col p-4 rounded-md '>
      
      <h1 className='text-[#187DF3] font-bold text-2xl'>Menu</h1>

      <div className='mt-12 flex flex-col gap-4'>

        <div className="flex gap-2">
          <Image src={profile} />
          <p>Profile</p>
        </div>

        <div className="flex gap-2">
          <Image src={attendance} />
          <p>Attendance</p>
        </div>


        <div className="flex gap-2">
          <Image src={instructor} />
          <p>My Instructor</p>
        </div>
        
      
        <p>Logout</p>
      </div>
      </div>
  )
}

export default Menu