import Attendance from '../../components/studentDashboard/Attendance'

import StudentLayout from '../../layout/studentLayout';


function Page({ courseId }) {
  return (
    <Attendance courseId={courseId} />
  )
}

Page.authRequired = true;
Page.Layout = StudentLayout

export const getServerSideProps = async ({ params }) => {
  return {
    props: {
      courseId: params.courseId
    }
  }
}

export default Page