import React, { useState } from 'react'
import Events from '../../components/admin/Events'
import Search from '../../components/admin/Search'
import Sidebar from '../../components/admin/Sidebar'
import Image from 'next/image'
import adminProfile from '../../images/adminProfile.svg'
import Attendance from '../../components/admin/Attendance'

const Dashboard = () => {
  const [adminAction,setAdminAction] = useState('Events Tab')


  return (
    <div className='flex justify-evenly  w-full gap-3 p-4'>
      <div className='w-3/12 flex flex-col'>
      <Search />
      <Sidebar setAdminAction={setAdminAction} adminAction={adminAction}/>
      </div>

      <div className='w-7/12 flex flex-col gap-4'>
      <div className='w-full  flex justify-end gap-2 items-center'>
        <p className='text-2xl font-bold'>Admin</p>
        <Image src={adminProfile} />
      </div>

      {adminAction === 'Events Tab' ? (
          <Events />
      ) : (
        <Attendance />
      ) }
    
     
      </div>
      
     
      {/* <div className='w-3/12 flex flex-col'>
      <Search />
      <Sidebar/>
      </div>
     

      
      

        <Events />     */}
    </div>
  )
}

export default Dashboard