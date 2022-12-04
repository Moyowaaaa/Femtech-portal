import { Button } from "@material-tailwind/react";
import React from "react";
import { Pie } from "react-chartjs-2";
import { toast } from "react-toastify";

import {
  CLOCK_IN_URL,
  CLOCK_OUT_URL,
  GET_ALL_ATTENDANCE_URL,
  GET_PRESENT_ATTENDANCE_URL,
} from "../../config";

import { useAuthContext } from "../../store/contexts";

import Calendar from "./Calendar";

import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";

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
    labels: ["Red", "Green"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50],
        backgroundColor: ["#008000", "#ff0000"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
      },
    },
    // maintainAspectRatio: false,
    // responsive: true,
  };
  return (
    <Pie
      data={data}
      options={options}
      // height={150}
      // width={150}
    />
  );
}

const Attendance = ({ courseId }) => {
  const { data } = useAuthContext();

  const {
    refetch: refetchAllAttendance,
    attendance: attendData,
  } = useGetAllAttendance({
    courseId
  });

  const { refetch, loading, attendance } = useGetAttendance({
    courseId
  });
  const { clockIn, loading: clockInLoading } = useClockIn({
    courseId,
    onSuccess() {
      refetch();
      refetchAllAttendance();
      toast.success("Clocked in successfully!");
    },
  });
  const { clockOut, loading: clockOutLoading } = useClockOut({
    courseId,
    onSuccess() {
      refetch();
      refetchAllAttendance();
      toast.success("Clocked out successfully!");
    },
  });

  return (
    <React.Fragment>
      <div className="shadow rounded-md border-2 border-[green] w-5/12 p-4 ">
        <h1 className="text-[#187DF3] font-bold text-2xl">
          Attendance Insight
        </h1>
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

        <div className="flex w-full flex-col gap-4 items-center mt-5">
          {loading ? (
            <>Loading Attendance Data...</>
          ) : !attendance ? (
            <Button
              disabled={loading || clockInLoading || clockOutLoading}
              onClick={clockIn}
              color="green"
            >
              <span>Clock In</span>
            </Button>
          ) : attendance && !attendance?.signOut_time ? (
            <Button
              disabled={loading || clockInLoading || clockOutLoading}
              onClick={clockOut}
              color="red"
            >
              <span>Clock Out</span>
            </Button>
          ) : (
            <>You have clocked out for this course today.</>
          )}
        </div>

        <blockquote className="bg-[black] border border-gray-900 font-bolder p-4 mt-4 rounded-md text-center text-white">
          Kindly Note: Students must certify 75% attendance before been
          qualified to sit for exams.
        </blockquote>
      </div>

      <div className="w-3/12 flex flex-col gap-6">
        <div className="shadow rounded-md w-full py-2 px-4 flex justify-between items-center text-base font-semibold">
          Hey, {data?.user?.fullname}
        </div>
        <Calendar attendance={attendData || []} />
      </div>
    </React.Fragment>
  );
};

function useClockIn({ courseId, onSuccess }) {
  const [loading, setLoading] = React.useState(false);

  const { data } = useAuthContext();

  const clockIn = React.useCallback(() => {
    setLoading(true);
    fetch(CLOCK_IN_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + data?.token,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ course_id: courseId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.status === 201) {
          onSuccess();
        } else if (data?.status === 400) {
          toast.warning(
            "Sorry! You can only clock in once for a course per day!"
          );
        } else {
          toast.error("An error occurred! Unable to clock in!");
        }
      })
      .catch((error) => {
        toast.error("A server error occurred! Unable to clock in");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [data]);

  return {
    clockIn,
    loading,
  };
}

function useClockOut({ courseId, onSuccess }) {
  const [loading, setLoading] = React.useState(false);

  const { data } = useAuthContext();

  const clockOut = React.useCallback(() => {
    setLoading(true);
    fetch(CLOCK_OUT_URL, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + data?.token,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ course_id: courseId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.status === 201) {
          onSuccess();
        } else {
          toast.error("An error occurred! Unable to clock out!");
        }
      })
      .catch((error) => {
        toast.error("A server error occurred! Unable to clock out");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [data, courseId]);

  return {
    clockOut,
    loading,
  };
}

function useGetAttendance({ courseId }) {
  const [attendance, setAttendance] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const { data } = useAuthContext();

  const getAttendance = React.useCallback(() => {
    setLoading(true);
    fetch(GET_PRESENT_ATTENDANCE_URL(courseId), {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + data?.token,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data[0] !== undefined) {
          setAttendance(data[0]);
        } else {
          toast.warning("You have not clocked in for this course today!");
        }
      })
      .catch((error) => {
        toast.error("A server error occurred!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [data, courseId]);

  React.useEffect(() => {
    getAttendance();
  }, [getAttendance]);

  return {
    attendance,
    loading,
    refetch: getAttendance,
  };
}

function useGetAllAttendance({ courseId }) {
  const [attendance, setAttendance] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const { data } = useAuthContext();

  const getAttendance = React.useCallback(() => {
    setLoading(true);
    fetch(GET_ALL_ATTENDANCE_URL(courseId), {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + data?.token,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAttendance(data);
        } else {
          toast.error(
            "An error occurred. Unable to get weekly attendance for this course!"
          );
        }
      })
      .catch((error) => {
        toast.error(
          "A server error occurred. Unable to get weekly attendance for this course!"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [data, courseId]);

  React.useEffect(() => {
    getAttendance();
  }, [getAttendance]);

  return {
    attendance,
    loading,
    refetch: getAttendance,
  };
}

export default Attendance;
