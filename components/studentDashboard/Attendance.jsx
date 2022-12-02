import { Button } from '@material-tailwind/react';
import React from "react";
import { Pie } from 'react-chartjs-2';
import Image from "next/image";

// import Chart from "../../images/chart.svg";
import userProfileImage from '../../images/profileImage.svg'

import Calendar from './Calendar'
import Events from './Events'

import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  CategoryScale,
  Filler,
  LinearScale,
  LineElement,
  PointElement
);

function Chart() {
  const data = {
    labels: [
      'Red',
      'Green',
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50],
      backgroundColor: [
        '#008000',
        '#ff0000'
      ],
      hoverOffset: 4
    }]
  };

  const options = {
    plugins: {
      legend: {
        display: true
      },
    },
    // maintainAspectRatio: false,
    // responsive: true,
  }
  return (
    <Pie
      data={data}
      options={options}
      // height={150}
      // width={150}
    />
  )
}

const Attendance = () => {
  const [clockedIn, setClockedIn] = React.useState(false);

  return (
    <React.Fragment>
      <div className="shadow rounded-md border-2 border-[green] w-5/12 p-4 ">
        <h1 className="text-[#187DF3] font-bold text-2xl">Attendance Insight</h1>
          <div className="flex justify-center mt-5">
            <div className="h-full w-[250px]">
              <Chart />
            </div>
          </div>

          <div className="flex justify-center w-full">
            <div className="flex justify-between mt-5 px-2 w-full">
              <div className="flex items-center text-sm gap-2 w-full">
                <div className="h-4 w-4 bg-[#33B35F]"></div>
                <p>Number of days Present</p>
              </div>

              <div className="flex items-center text-sm gap-2 w-full">
                <div className="h-4 w-4 bg-[#B33352]"></div>
                <p>Number of days Absent</p>
              </div>
            </div>
          </div>

        <div className="flex w-full flex-col gap-4 items-center mt-10">
          {!clockedIn ? (
            <Button onClick={() => setClockedIn(true)} color="green">
              <span>Clock In</span>
            </Button>
          ) : (
            <Button onClick={() => setClockedIn(false)} color="red">
              <span>Clock Out</span>
            </Button>
          )}
        </div>
      </div>

      <div className="w-3/12 flex flex-col gap-6">
        <div className="shadow rounded-md  w-full py-2 flex justify-between items-center pr-6 pl-24 text-xl font-semibold">
          HEY, John
          {/*<div className="w-[5rem] h-[5rem] rounded-full">
            <Image src={userProfileImage} alt="" />
          </div>*/}
        </div>
        {/*<Events />*/}
        <Calendar />
      </div>
    </React.Fragment>
  );
};

export default Attendance;
