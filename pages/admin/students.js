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

import Topbar from "../../components/admin/Topbar";
import { Input, Table } from "../../components/controls";
import { ADMIN_STUDENTS_URL, EXPORT_URL } from "../../config";
import { useAdminAuthContext } from "../../store/contexts";

const tdClassName =
  "border-b border-gray-200 font-medium p-4 text-left text-gray-800";
const thClassName = "border-b font-bold p-4 text-gray-100 text-left uppercase";

const currentDate = new Date();

function Dashboard() {
  const [search, setSearch] = React.useState("");

  const { students = [], loading, refetch } = useGetStudents();

  const { loading: exportLoading, exportData } = useExportData()

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
        const searchItem = item.fullname.toLowerCase() + " " + item.id.toLowerCase();
        return searchItem.includes(search.toLowerCase());
      });
    }
    return currentData.reverse();
  }, [search, students]);

  const handleExport = React.useCallback(() => {
    const info = {
      fileName: "Students " +
        currentDate.toLocaleDateString("en-Ca").replaceAll("-", "_"),
      data,
      title: "Students",
      headers: columns.map(column => ({
        header: column.Header,
        key: column.accessor
      }))
    }
    exportData(info)    
  }, [columns, data, exportData]);

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
                disabled={exportLoading}
                className="flex items-center justify-center"
                color="blue"
                fullWidth
              >
                <FolderArrowDownIcon className="h-5 mr-2 text-gray-100 w-5" />
                <span className="capitalize text-gray-100">{exportLoading ? "Exporting..." : "Export"}</span>
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

function useExportData() {
  const [loading, setLoading] = React.useState(false);

  async function exportData(info) {
    setLoading(true)
    
    fetch(EXPORT_URL, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info)
    })
    .then(res => {
      if (res.ok) return res.blob()
      else throw res.json()
    })
    .then(data => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', info.fileName + ".xlsx");
      document.body.appendChild(link);
      link.click();
    })
    .catch(err => {
      toast.error(err?.message || 'An error occurred. Can not export data')
    })
    .finally(() => {
      setLoading(false)
    })
  }

  return {
    loading,
    exportData
  }
}

Dashboard.authRequired = true;
Dashboard.adminAuth = true;

export default Dashboard;
