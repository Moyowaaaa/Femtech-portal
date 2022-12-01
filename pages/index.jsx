import Profile from '../components/studentDashboard/Profile'

import StudentLayout from '../layout/studentLayout';


function Page() {
  return (
    <Profile />
  )
}

Page.authRequired = true;
Page.Layout = StudentLayout

export default Page