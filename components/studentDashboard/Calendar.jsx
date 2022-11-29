import React from 'react'
import Scheduler from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

const Calendar = () => {
  return (
    <div>
        <h1 className='text-[#187DF3] font-bold text-2xl pb-4'>Calendar</h1>

        <Scheduler />

        </div>
  )
}

export default Calendar