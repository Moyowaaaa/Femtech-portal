import React from 'react'
import Events from '../../components/admin/Events'
import Search from '../../components/admin/Search'
import Sidebar from '../../components/admin/Sidebar'

const Dashboard = () => {
  return (
    <div className='flex justify-evenly h-screen w-full gap-3 p-4'>

        <div className="flex flex-col w-3/12 w-gap-4 h-screen">
        <Search />
          <Sidebar />
        </div>
      

        <Events />    
    </div>
  )
}

Dashboard.authRequired = true;

export default Dashboard