import React from 'react'
import Image from 'next/image'
import instructor from '../../images/instructor.svg'
import profile from '../../images/profile.svg'
import attendance from '../../images/attendance.svg'
import logout from '../../images/logout.svg'
import Link from 'next/link'



const Menu = ({studentAction, setStudentAction}) => {
  return (
    <div className='shadow w-2/12   shadow-lg flex flex-col p-4 rounded-md cursor-pointer'>
      
      <h1 className='text-[#187DF3] font-bold text-2xl'>Menu</h1>

      <div className='mt-12 flex flex-col gap-4'>

        <div className={`flex gap-2 hover:border-2 hover:p-2 hover:border-[blue] ${studentAction === 'Profile Update' ? 'border-2 border-[blue] py-2' :'' }`} onClick={() => {setStudentAction('Profile Update')}}>
          <Image src={profile} />
          <p>Profile</p>
        </div>

        <div className={`flex gap-2 hover:border-2 hover:p-2 hover:border-[blue] ${studentAction === 'Attendance' ? 'border-2 border-[blue] py-2' :'' }`} onClick={() => {setStudentAction('Attendance')}}>
          <Image src={attendance} />
          <p>Attendance</p>
        </div>


        <div className="flex gap-2">
          <Image src={instructor} />
          <p>My Instructor</p>
        </div>

        <Link href='/'>
        <div className="flex gap-2">
          <Image src={logout} />
          <p>Logout</p>
        </div>
        </Link>
     
       
      </div>
      </div>
  )
}

export default Menu