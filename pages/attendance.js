import Attendance from '../components/studentDashboard/Attendance'

import StudentLayout from '../layout/studentLayout';


function Page() {
  return (
    <Attendance />
  )
}

Page.authRequired = true;
Page.Layout = StudentLayout

export default Page