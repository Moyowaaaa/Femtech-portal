import {
  ArrowPathIcon,
  FolderArrowDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import React from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

import Topbar from "../../components/admin/Topbar";
import { Input, Select, Table } from "../../components/controls";
import { ADMIN_ATTENDANCE_URL } from "../../config";
import { useOutClick } from "../../hooks";
import { useAdminAuthContext } from "../../store/contexts";
import { getNextDate } from "../../utils";

const tdClassName =
  "border-b border-gray-200 font-medium p-4 text-left text-gray-800";
const thClassName = "border-b font-bold p-4 text-gray-100 text-left uppercase";

const currentDate = new Date();

const defaultFilterValue = {
  search: "",
  from: currentDate.toLocaleDateString("en-Ca"),
  to: getNextDate(currentDate, 1, true),
};

function Dashboard() {
  const [filter, setFilter] = React.useState(defaultFilterValue);

  const { attendance = [], loading, refetch } = useGetAttendance();

  const getAttendance = React.useCallback(() => {
    refetch({
      from_d: filter.from.replaceAll("-", "/"),
      to_d: filter.to.replaceAll("-", "/"),
    });
  }, [filter.from, filter.date, refetch]);

  React.useEffect(() => {
    getAttendance();
  }, [getAttendance]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Student",
        accessor: "fullname",
      },
      {
        Header: "Date",
        accessor: "date",
        id: "date",
      },
      {
        Header: "Clocked In",
        accessor: "clockIn",
      },
      {
        Header: "Clocked Out",
        accessor: "clockOut",
      },
      // {
      //   Header: "Actions",
      //   accessor: "id",
      //   Cell: (props) => <ActionCell {...props} onSelect={onSelect} />,
      // },
    ],
    []
  );

  const data = React.useMemo(() => {
    let currentData = [];
    currentData = attendance.map((item) => ({
      fullname: item.firstname + " " + item.surname,
      date: new Date(item.created_at).toLocaleDateString("en-Ca"),
      clockIn: item.signIn_time,
      clockOut: item.signOut_time,
    }));
    if (filter.search && filter.search.trim().length > 0) {
      currentData = currentData.filter((item) => {
        const search = filter.search.toLowerCase();
        const searchItem = item.fullname.toLowerCase();
        return searchItem.includes(search);
      });
    }
    return currentData.reverse();
  }, [attendance, filter.search]);

  const handleExport = React.useCallback(() => {
    const excelHeaders = columns.map((column) => column.Header);

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, "Attendance Sheet 1");
    XLSX.writeFile(
      wb,
      "Attendance " +
        currentDate.toLocaleDateString("en-Ca").replaceAll("-", "_") +
        " .xlsx"
    );
  }, [columns, data]);

  return (
    <div className="min-h-full">
      <Topbar />

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-700">
            Attendance Records
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center my-4 py-2 md:py-3 lg:pt-4">
            <div className="mr-6 w-[12rem]">
              <Button
                onClick={getAttendance}
                className="flex items-center justify-center"
                color="green"
                fullWidth
              >
                <ArrowPathIcon className="h-5 mr-2 text-gray-100 w-5" />
                <span className="capitalize text-gray-100">Refetch</span>
              </Button>
            </div>
            <div className="w-[12rem]">
              <Button
                onClick={handleExport}
                className="flex items-center justify-center"
                color="blue"
                fullWidth
              >
                <FolderArrowDownIcon className="h-5 mr-2 text-gray-100 w-5" />
                <span className="capitalize text-gray-100">Export</span>
              </Button>
            </div>
          </div>

          <div className="gap-6 grid my-4 py-2 items-center sm:grid-cols-2 md:grid-cols-4">
            <div className="w-full md:col-span-2">
              <Input
                value={filter.search}
                icon={<MagnifyingGlassIcon />}
                onChange={(e) => {
                  setFilter((prevState) => ({
                    ...prevState,
                    search: e.target.value,
                  }));
                }}
                label="Search..."
              />
            </div>
            <div className="w-full">
              <DateFilter filter={filter} setFilter={setFilter} />
            </div>
          </div>

          {/*{loading && (!data || !Array.isArray(data) || data.length <= 0) ? (*/}
          {loading ? (
            <>
              <div className="flex items-center justify-center my-6 py-6">
                <div className="w-24 h-24 border-l-2 border-r-2 border-blue-900 rounded-full animate-spin"></div>
              </div>
              <p className="font-bold my-3 text-center text-blue-700">
                Loading Attendance Data...
              </p>
            </>
          ) : (
            <Table columns={columns} data={data} />
          )}
        </div>
      </main>
    </div>
  );
}

function useGetAttendance() {
  const [attendance, setAttendance] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const { data } = useAdminAuthContext();

  const getAttendance = React.useCallback(
    (query) => {
      setLoading(true);
      fetch(ADMIN_ATTENDANCE_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + data?.token,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
      })
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setAttendance(data);
          } else {
            toast.error("An error occurred!");
          }
        })
        .catch((error) => {
          toast.error("A server error occurred!");
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [data]
  );

  return {
    attendance,
    loading,
    refetch: getAttendance,
  };
}

Dashboard.authRequired = true;
Dashboard.adminAuth = true;

export default Dashboard;

function DateFilter({ filter, setFilter }) {
  const { buttonRef, ref, visible, setVisible } = useOutClick();
  const [value, setValue] = React.useState("1");

  const [from, setFrom] = React.useState(
    filter.from || defaultFilterValue.from
  );
  const [to, setTo] = React.useState(filter.to || defaultFilterValue.to);

  const handleChange = React.useCallback(
    (option) => {
      setValue(option);
      if (option === "custom") setVisible(!visible);
      else if (option === "" || !option) {
        if (visible) setVisible(false);
        setFilter((prevState) => ({
          ...prevState,
          from: defaultFilterValue.from,
          to: defaultFilterValue.to,
        }));
        setFrom(defaultFilterValue.from);
        setTo(defaultFilterValue.to);
      } else {
        if (visible) setVisible(false);
        const to = getNextDate(new Date(), 1, false);
        const from = getNextDate(to, -1 * Number(option), true); // get the previous date

        setFilter((prevState) => ({
          ...prevState,
          from,
          to: to.toLocaleDateString("en-Ca"),
        }));

        setFrom(from);
        setTo(to.toLocaleDateString("en-Ca"));
      }
    },
    [setFilter, visible, setVisible]
  );

  return (
    <div className="relative w-full">
      <div className="w-full" ref={buttonRef}>
        <Select
          label="Date"
          onChange={handleChange}
          options={[
            { title: "Today", value: "1" },
            { title: "Yesterday", value: "2" },
            { title: "Last 7 days", value: "7" },
            { title: "Last 30 days", value: "30" },
            { title: "Last 90 days", value: "90" },
            { title: "Last 180 days", value: "180" },
            { title: "Last 366 days", value: "366" },
            { title: "Custom Date", value: "custom" },
          ]}
          value={value}
        />
      </div>
      {visible && (
        <div
          ref={ref}
          className="absolute bg-white gap-4 grid grid-cols-2 left-0 top-[150%] w-full z-20 md:gap-y-5 md:grid-cols-1"
        >
          <div>
            <Input
              label="Date From"
              type="date"
              onChange={({ target: { value } }) => {
                setFrom(value);
                setFilter((prevState) => ({
                  ...prevState,
                  from: value,
                }));
              }}
              value={from || ""}
            />
          </div>
          <div>
            <Input
              label="Date To"
              type="date"
              onChange={({ target: { value } }) => {
                setTo(value);
                setFilter((prevState) => ({
                  ...prevState,
                  to: value,
                }));
              }}
              value={to || ""}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// function ActionCell({ onSelect, value }) {
//   return (
//     <div className="flex items-center justify-around">
//       <Menu placement="bottom-end">
//         <MenuHandler>
//           <span className="cursor-pointer inline-block p-2 rounded-full hover:bg-gray-300">
//             <Bars3Icon className="h-4 text-blue-600 w-4" />
//           </span>
//         </MenuHandler>
//         <MenuList>
//           <MenuItem onClick={() => onSelect(value)}>View</MenuItem>
//           <MenuItem>Re-query</MenuItem>
//           <MenuItem>Mark As Failed</MenuItem>
//         </MenuList>
//       </Menu>
//     </div>
//   );
// }
