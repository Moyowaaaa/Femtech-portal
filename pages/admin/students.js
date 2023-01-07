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
import { Input, Table } from "../../components/controls";
import { ADMIN_STUDENTS_URL } from "../../config";
import { useAdminAuthContext } from "../../store/contexts";

const tdClassName =
  "border-b border-gray-200 font-medium p-4 text-left text-gray-800";
const thClassName = "border-b font-bold p-4 text-gray-100 text-left uppercase";

const currentDate = new Date();

function Dashboard() {
  const [search, setSearch] = React.useState("");

  const { students = [], loading, refetch } = useGetStudents();

  const columns = React.useMemo(
    () => [
      {
        Header: "Full Name",
        accessor: "fullname",
      },
      {
        Header: "Student ID",
        accessor: "id",
      },
      {
        Header: "Date Joined",
        accessor: "date",
        id: "date",
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
    currentData = students.map((item) => ({
      fullname: item.fullname,
      id: item.user_id,
      date: new Date(item.created_at).toLocaleDateString("en-Ca"),
    }));
    if (search && search.trim().length > 0) {
      currentData = currentData.filter((item) => {
        const searchItem = item.fullname.toLowerCase();
        return searchItem.includes(search.toLowerCase());
      });
    }
    return currentData.reverse();
  }, [search, students]);

  const handleExport = React.useCallback(() => {
    const excelHeaders = columns.map((column) => column.Header);

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, "Students Sheet 1");
    XLSX.writeFile(
      wb,
      "Students" +
        currentDate.toLocaleDateString("en-Ca").replaceAll("-", "_") +
        ".xlsx"
    );
  }, [columns, data]);

  return (
    <div className="min-h-full">
      <Topbar />

      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-700">
            Students Records
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center my-4 py-2 md:py-3 lg:pt-4">
            <div className="mr-6 w-[12rem]">
              <Button
                onClick={refetch}
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
                value={search}
                icon={<MagnifyingGlassIcon />}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                label="Search..."
              />
            </div>
          </div>

          {/*{loading && (!data || !Array.isArray(data) || data.length <= 0) ? (*/}
          {loading ? (
            <>
              <div className="flex items-center justify-center my-6 py-6">
                <div className="w-24 h-24 border-l-2 border-r-2 border-blue-900 rounded-full animate-spin"></div>
              </div>
              <p className="font-bold my-3 text-center text-blue-700">
                Loading Students Data...
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

function useGetStudents() {
  const [students, setStudents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const { data } = useAdminAuthContext();

  const getStudents = React.useCallback(() => {
    setLoading(true);
    fetch(ADMIN_STUDENTS_URL, {
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
          setStudents(data);
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
  }, [data]);

  React.useEffect(() => {
    getStudents();
  }, [getStudents]);

  return {
    students,
    loading,
    refetch: getStudents,
  };
}

Dashboard.authRequired = true;
Dashboard.adminAuth = true;

export default Dashboard;

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
