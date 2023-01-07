import { Button } from "@material-tailwind/react";
import { useRouter } from "next/router";
import React from "react";
import { Pie } from "react-chartjs-2";
import { toast } from "react-toastify";

import {
  ATTENDANCE_FAILED_PAGE,
  ATTENDANCE_SUCCESSFUL_PAGE,
  ATTENDANCE_SUCCESSFULL_PAGE,
  CLOCK_IN_URL,
  CLOCK_OUT_URL,
  COURSE_DURATION_URL,
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

function Chart({ signIn, total }) {
  const data = {
    labels: ["Green", "Red"],
    datasets: [
      {
        label: "My First Dataset",
        data: [signIn, total - signIn >= 0 ? total - signIn : 0],
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
    }
  };
  return (
    <Pie
      data={data}
      options={options}
    />
  );
}

const Attendance = ({ courseId }) => {
  const { data } = useAuthContext();
  const router = useRouter();

  const {
    refetch: refetchAllAttendance,
    attendance: attendData,
    loading: attendLoading,
  } = useGetAllAttendance({
    courseId,
  });

  const totalAttendanceCount = React.useMemo(() => {
    if (attendData && Array.isArray(attendData) && attendData.length > 0) {
      const count = attendData.reduce((totalCount, currentAttendance) => {
        if (currentAttendance.signIn_time && currentAttendance.signOut_time) {
          return totalCount + 1;
        }
        return totalCount;
      }, 0);
      return count;
    }
    return 0;
  }, [attendData]);

  const { loading: durationLoading, duration } = useGetCourseDuration()
  const { refetch, loading, attendance } = useGetAttendance({
    courseId,
  });
  const { clockIn, loading: clockInLoading } = useClockIn({
    courseId,
    onSuccess() {
      refetch();
      refetchAllAttendance();
      toast.success("Clocked in successfully!");
      router.push(ATTENDANCE_SUCCESSFUL_PAGE);
    },
    onError() {
      router.push(ATTENDANCE_FAILED_PAGE);
    },
  });
  const { clockOut, loading: clockOutLoading } = useClockOut({
    courseId,
    onSuccess() {
      refetch();
      refetchAllAttendance();
      toast.success("Clocked out successfully!");
      router.push(ATTENDANCE_SUCCESSFULL_PAGE);
    },
    onError() {
      router.push(ATTENDANCE_FAILED_PAGE);
    },
  });

  return (
    <React.Fragment>
      <div className="shadow rounded-md border-2 border-[green] w-5/12 p-4 ">
        <h1 className="text-[#187DF3] font-bold text-2xl">
          Attendance Insight
        </h1>
        <div className="flex justify-center mt-5">
          <div className="h-full w-[200px]">
            {attendLoading || durationLoading ? (
              <>
                <div className="flex items-center justify-center my-4">
                  <div className="w-40 h-40 border-l-2 border-blue-900 rounded-full animate-spin"></div>
                </div>
                <p className="font-bold my-3 text-center text-blue-700">
                  Loading Chart Data...
                </p>
              </>
            ) : (
              <div>
                <Chart signIn={totalAttendanceCount} total={duration} />
                <p className="font-bold mt-2 text-center text-blue-700">
                  Percentage: {(totalAttendanceCount > 0 && !isNaN(duration) && duration > 0
                    ? Math.round((totalAttendanceCount / duration) * 100)
                    : 0) + "%"}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center w-full">
          <div className="flex justify-between mt-2 px-2 w-full">
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

function useClockIn({ courseId, onSuccess, onError }) {
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
        if (onError) onError();
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

function useClockOut({ courseId, onSuccess, onError }) {
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
        if (onError) onError();
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

function useGetCourseDuration() {
  const [duration, setDuration] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  const { data } = useAuthContext();

  const { query } = useRouter();

  const getCourseDuration = React.useCallback(() => {
    setLoading(true);
    fetch(COURSE_DURATION_URL(query.originalCourseId || ""), {
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
        if (data.message) {
          setDuration(data.message);
        } else {
          toast.warning("Unable to get information about this course!");
        }
      })
      .catch((error) => {
        toast.error("A server error occurred!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [data, query]);

  React.useEffect(() => {
    getCourseDuration();
  }, [getCourseDuration]);

  return {
    duration,
    loading,
    refetch: getCourseDuration,
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
