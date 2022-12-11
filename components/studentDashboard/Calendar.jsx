import React from 'react'

import { Calendar } from '../common';

const StudentCalendar = ({ attendance = [] }) => {

  return (
    <div>
      <h1 className='text-[#187DF3] font-bold text-2xl pb-4'>Calendar</h1>

      <Calendar attendance={attendance} />
    </div>
  )
}

export default StudentCalendar