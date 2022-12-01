import React, { useState } from 'react'
import Attendance from '../components/studentDashboard/Attendance'
import Calendar from '../components/studentDashboard/Calendar'
import Events from '../components/studentDashboard/Events'
import Menu from '../components/studentDashboard/Menu'
import Profile from '../components/studentDashboard/Profile'
import userProfileImage from '../images/profileImage.svg'
import Image from 'next/image'


const StudentDashboard = () => {
  const [studentAction, setStudentAction] = useState('Profile Update')



  return (
    <div className='flex justify-evenly h-screen w-full gap-3 p-4'>
        <Menu setStudentAction={setStudentAction} studentAction={studentAction}/>
        {studentAction  === 'Profile Update' ? (
          <Profile />
        ) : (
           <Attendance />
        )}
      
       

        <div className='w-4/12 flex flex-col gap-6'>
            <div className='shadow rounded-md  w-full py-2 flex justify-between items-center pr-6 pl-24 text-xl font-semibold'>
               HEY, John 

               <div className='w-[5rem] h-[5rem] rounded-full'>
                <Image src={userProfileImage}/>
               </div>
            </div>
            <Events />
            <Calendar />
        </div>
        </div>
  )
}

StudentDashboard.authRequired = true;

export default StudentDashboard