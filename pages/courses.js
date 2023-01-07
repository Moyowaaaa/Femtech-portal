import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
} from "@material-tailwind/react";
import React from "react";
import { toast } from "react-toastify";
import Link from "next/link";

import Events from "../components/studentDashboard/Events";
import RegisterCourseForm from "../components/studentDashboard/Courses/RegisterForm";
import { COURSES_URL, REGISTER_COURSE_URL, USER_COURSES_URL } from "../config";
import { useAuthContext } from "../store/contexts";
import Layout from "../layout/studentLayout";

function Courses() {
	const { data } = useAuthContext();

	const {
		courses: userCourses,
		loading: userCoursesLoading,
		refetch,
	} = useGetUserCourses();
	const { courses: allCourses, loading } = useGetAllCourses();

	const [open, setOpen] = React.useState(false);

	const courses = React.useMemo(() => {
		const courseNames = userCourses.map((item) => item.course);
		return allCourses.filter((item) => !courseNames.includes(item.name));
	}, [allCourses, userCourses]);

	return (
		<React.Fragment>
			<div className="w-6/12 px-5">
				<div className="mb-4">
					<Button
						disabled={loading || userCoursesLoading}
						color={loading || userCoursesLoading ? "gray" : "blue"}
						onClick={() => setOpen(true)}
					>
						<span>
							{loading || userCoursesLoading
								? "Loading Courses. Please Wait"
								: "Register a new course"}
						</span>
					</Button>
				</div>
				{userCoursesLoading || loading ? 
					<React.Fragment>Loading Courses ...</React.Fragment>
				 : userCourses.length <= 0 ? (
					<React.Fragment>
						You have not registerd for any course. Click the button above to
						register
					</React.Fragment>
				) : (
					userCourses
						.sort((a, b) => {
							let x = a.course.toLowerCase();
							let y = b.course.toLowerCase();
							if (x < y) return -1;
							if (x > y) return 1;
							return 0;
						})
						.map(({ id, course: name }, index) => {
							let course = Array.isArray(allCourses) ? allCourses.find(item => item.name.toLowerCase() === name.toLowerCase()) : null;
							return (
								<Link href={`/attendance/${id}/?originalCourseId=${course?.id || ""}`} key={index}>
									<a className="p-2 w-full">
										<div
											className="bg-white border border-gray-100 cursor-pointer duration-500 flex items-center p-3 rounded-lg shadow-l transition transform hover:scale-105 hover:bg-gray-100"
											key={index}
										>
											<span
												className={`${
													name.length > 65 ? "w-[4rem]" : "w-[3rem]"
												} bg-gray-200 flex items-center justify-center font-bold h-[3rem] min-w-[3rem] rounded-full mr-1 text-gray-600 text-xl uppercase`}
											>
												{name[0].toUpperCase()}
											</span>
											<p className="capitalize font-semibold ml-1 text-gray-700 text-sm tracking-wider md:text-base">
												{name}
											</p>
										</div>
									</a>
								</Link>
							);
						})
				)}
				<RegisterCourseForm
					courses={courses}
					open={open}
					setOpen={setOpen}
					onRegisterSuccess={() => {
						refetch();
						setOpen(false);
						toast.success("Registered for course successfully!", {
							autoClose: 10000,
						});
					}}
				/>
			</div>
			<div className="w-3/12 flex flex-col gap-6">
				<div className="shadow rounded-md w-full py-2 px-4 flex justify-between items-center text-base font-semibold">
					Hey, {data?.user?.fullname}
				</div>
				<Events />
			</div>
		</React.Fragment>
	);
}

function useGetAllCourses() {
	const [courses, setCourses] = React.useState([]);
	const [loading, setLoading] = React.useState(true);

	const { data } = useAuthContext();

	React.useEffect(() => {
		setLoading(true);
		fetch(COURSES_URL, {
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
				if (data?.status_code === 201) {
					setCourses(data.message);
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

	return {
		courses,
		loading,
	};
}

function useGetUserCourses() {
	const [courses, setCourses] = React.useState([]);
	const [loading, setLoading] = React.useState(true);

	const { data } = useAuthContext();

	const getCourses = React.useCallback(() => {
		setLoading(true);
		fetch(USER_COURSES_URL, {
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
				if (data?.status_code === 201) {
					if (Array.isArray(data.message) && data.message.length > 0)
						setCourses(data.message);
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
		getCourses();
	}, [getCourses]);

	return {
		courses,
		loading,
		refetch: getCourses,
	};
}

Courses.authRequired = true;
Courses.Layout = Layout;

export default Courses;
