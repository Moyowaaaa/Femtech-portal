import { FolderArrowDownIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import React from "react";
import * as XLSX from "xlsx";

import Topbar from "../../components/admin/Topbar";
import { Input, Select, Table } from "../../components/controls";
import { AvatarIdCell } from "../../components/controls/table/cells"
import { useOutClick } from "../../hooks";
import { getNextDate } from "../../utils";

const tdClassName =
  "border-b border-gray-200 font-medium p-4 text-left text-gray-800";
const thClassName = "border-b font-bold p-4 text-gray-100 text-left uppercase";

const defaultFilterValue = {
  search: "",
  from: "",
  to: "",
};

function Dashboard() {
  const [filter, setFilter] = React.useState(defaultFilterValue);

  const handleChange = React.useCallback(({ target: { name, value } }) => {
    setFilter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Student",
        accessor: "fullname",
        idAccessor: "id",
        imageAccessor: "image",
        Cell: AvatarIdCell,
      },
      {
        Header: "Course",
        accessor: "course",
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
    let currentData = globalData;
    if (filter.from && filter.to) {
      let from = new Date(filter.from).getTime()
      let to = new Date(filter.to).getTime()

      currentData = currentData.filter(item => {
        const date = new Date(item.date).getTime();
        if (date >= from && date <= to) return item
      })
    }
    if (filter.search && filter.search.trim().length > 0) {
      currentData = currentData.filter(item => {
        const search = filter.search.toLowerCase();
        const searchItem = item.fullname.toLowerCase() + " " + item.course.toLowerCase() + " " + item.id.toLowerCase()
        return searchItem.includes(search)
      })
    }
    return currentData
  }, [filter])

  const handleExport = React.useCallback(() => {
    const excelHeaders = columns.map(column => column.Header);

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data)

    XLSX.utils.book_append_sheet(wb, ws, "Attendance Sheet 1");
    XLSX.writeFile(wb, "Attendance.xlsx")
  }, [columns, data])

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
            <div className="w-[12rem]">
              <Button onClick={handleExport} className="flex items-center justify-center" color="blue" fullWidth>
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
                  setFilter(prevState => ({
                    ...prevState,
                    search: e.target.value
                  }))
                }}
                label="Search..."
              />
            </div>
            <div className="w-full">
              <DateFilter filter={filter} setFilter={setFilter} />
            </div>
          </div>

          <Table columns={columns} data={data} />
        </div>
      </main>
    </div>
  );
}

Dashboard.authRequired = false;
Dashboard.adminAuth = true;

export default Dashboard;

const globalData = [
  {
    id: "fiti/22/001",
    image: null,
    fullname: "John Doe",
    course: "Web Design and Development",
    date: "2022-11-20",
    clockIn: "8:03:00 AM",
    clockOut: "8:03:00 AM",
  },
  {
    id: "fiti/22/002",
    image: null,
    fullname: "Anna Dey Johnson",
    course: "Web Design and Development",
    date: "2022-11-24",
    clockIn: "8:03:00 AM",
    clockOut: "8:03:00 AM",
  },
  {
    id: "fiti/22/003",
    image: null,
    fullname: "Jeremiah Ismael",
    course: "Web Design and Development",
    date: "2022-11-28",
    clockIn: "8:03:00 AM",
    clockOut: "8:03:00 AM",
  },
  {
    id: "fiti/22/004",
    image: null,
    fullname: "Genevieve Something",
    course: "Web Design and Development",
    date: "2022-12-10",
    clockIn: "8:03:00 AM",
    clockOut: "8:03:00 AM",
  },
  {
    id: "fiti/22/005",
    image: null,
    fullname: "Paul Flyer",
    course: "Web Design and Development",
    date: "2022-12-14",
    clockIn: "8:03:00 AM",
    clockOut: "8:03:00 AM",
  },
  {
    id: "fiti/22/006",
    image: null,
    fullname: "Peace Flyer",
    course: "Web Design and Development",
    date: "2022-12-18",
    clockIn: "8:03:00 AM",
    clockOut: "8:03:00 AM",
  },
  {
    id: "fiti/22/007",
    image: null,
    fullname: "James Anderson",
    course: "Web Design and Development",
    date: "2022-12-20",
    clockIn: "8:03:00 AM",
    clockOut: "8:03:00 AM",
  },
  {
    id: "fiti/22/008",
    image: null,
    fullname: "Johnson Grace",
    course: "Web Design and Development",
    date: "2022-12-22",
    clockIn: "8:03:00 AM",
    clockOut: "8:03:00 AM",
  },
  {
    id: "fiti/22/009",
    image: null,
    fullname: "Perseus Jackson",
    course: "Web Design and Development",
    date: "2022-12-26",
    clockIn: "8:03:00 AM",
    clockOut: "8:03:00 AM",
  },
]

function DateFilter({ filter, setFilter }) {
  const { buttonRef, ref, visible, setVisible } = useOutClick();
  const [value, setValue] = React.useState("");

  const [from, setFrom] = React.useState(filter.from || "");
  const [to, setTo] = React.useState(filter.to || "")

  const handleChange = React.useCallback(
    (option) => {
      setValue(option);
      if (option === "custom") setVisible(!visible);
      else if (option === "" || !option) {
        if (visible) setVisible(false);
        setFilter((prevState) => ({
          ...prevState,
          from: "",
          to: "",
        }));
        setFrom(""); setTo("");
      } else {
        if (visible) setVisible(false);
        const to = new Date();
        const from = getNextDate(to, -1 * Number(option), true); // get the previous date

        setFilter((prevState) => ({
          ...prevState,
          from, 
          to: to.toLocaleDateString('en-Ca'),
        }));

        setFrom(from); setTo(to.toLocaleDateString('en-Ca'))
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
            { title: "All", value: "" },
            { title: "Today", value: "1" },
            { title: "Last 7 days", value: "7" },
            { title: "Last 30 days", value: "30" },
            { title: "Last 90 days", value: "90" },
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
                setFrom(value)
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
                setTo(value)
                setFilter((prevState) => ({
                  ...prevState,
                  to: value
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

