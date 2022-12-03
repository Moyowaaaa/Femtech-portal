import React from 'react'
import Profile from '../components/studentDashboard/Profile'
import Events from '../components/studentDashboard/Events';

import StudentLayout from '../layout/studentLayout';
import { useAuthContext } from "../store/contexts"

function Page() {
  const { data } = useAuthContext();

  return (
    <React.Fragment>
      <Profile />
        <div className="w-3/12 flex flex-col gap-6">
          <div className="shadow rounded-md w-full py-2 px-4 flex justify-between items-center text-base font-semibold">
            Hey, {data?.user?.fullname}
          </div>
          <Events />
        </div>
    </React.Fragment>
  )
}

Page.authRequired = true;
Page.Layout = StudentLayout

export default Page