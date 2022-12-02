import React from 'react'

import { Calendar } from '../common';

const StudentCalendar = () => {
  const [date, setDate] = React.useState(new Date())
  return (
    <div>
      <h1 className='text-[#187DF3] font-bold text-2xl pb-4'>Calendar</h1>

      <Calendar />
    </div>
  )
}

export default StudentCalendar