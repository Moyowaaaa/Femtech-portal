import React from 'react'
import Profile from '../components/studentDashboard/Profile'
import Events from '../components/studentDashboard/Events';

import StudentLayout from '../layout/studentLayout';


function Page() {
  return (
    <React.Fragment>
      <Profile />
        <div className="w-3/12 flex flex-col gap-6">
          <div className="shadow rounded-md  w-full py-2 flex justify-between items-center pr-6 pl-24 text-xl font-semibold">
            HEY, John
            {/*<div className="w-[5rem] h-[5rem] rounded-full">
              <Image src={userProfileImage} alt="" />
            </div>*/}
          </div>
          <Events />
        </div>
    </React.Fragment>
  )
}

Page.authRequired = true;
Page.Layout = StudentLayout

export default Page