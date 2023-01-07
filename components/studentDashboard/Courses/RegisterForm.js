import {
	Button,
	Input,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
} from "@material-tailwind/react";
import React from "react";
import { toast } from "react-toastify";

import { REGISTER_COURSE_URL } from "../../../config";
import { useAuthContext } from "../../../store/contexts";

function RegisterForm({ open, setOpen, courses = [], onRegisterSuccess }) {
	const [selectOpen, setSelectOpen] = React.useState(false);
	const [selectedCourse, setSelectedCourse] = React.useState(null);
	const [search, setSearch] = React.useState("");

	// Represents the filtered courses by search input
	const filCourses = React.useMemo(() => {
		if (Array.isArray(courses)) {
			const filSearch = search.toLowerCase().trim();
			const sortedCourses = courses.sort((a, b) => {
				let x = a.name.toLowerCase();
				let y = b.name.toLowerCase();
				if (x < y) return -1;
				if (x > y) return 1;
				return 0;
			});
			if (filSearch === "") return sortedCourses;
			return sortedCourses.filter((course) => {
				const name = course.name.toLowerCase();
				if (name.includes(filSearch)) return course;
			});
		}
		return [];
	}, [courses, search]);

	const { loading, register } = useRegisterCourseRequest({
		onSuccess: () => {
			onRegisterSuccess();
			setSelectOpen(false);
			setSelectedCourse(null);
		},
		onError(error) {
			toast.error(error);
		},
	});

	return (
		<Dialog
			size="lg"
			open={open}
			handler={() => setOpen((prevState) => !prevState)}
		>
			<DialogHeader>Register a new course</DialogHeader>
			<DialogBody divider>
				<div className="h-full min-h-[15rem] pb-[8rem] w-full">
					<div className="mb-4">
						<Input
							label="Search for a course"
							onFocus={() => setSelectOpen(true)}
							onChange={({ target: { value } }) => setSearch(value)}
							value={search}
						/>
					</div>
					<div className="h-full">
						<label
							id="listbox-label"
							className="block text-sm font-medium text-gray-700"
						>
							Select Course to Register
						</label>
						<div className="h-full relative mt-2">
							<button
								onClick={() =>
									!loading
										? setSelectOpen((prevState) => !prevState)
										: undefined
								}
								type="button"
								className="relative w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm"
							>
								<span className="flex items-center">
									{selectedCourse ? (
										<span className="ml-3 block font-semibold text-gray-900 truncate">
											{selectedCourse.name}
										</span>
									) : (
										<span className="ml-3 block truncate">Select a Course</span>
									)}
								</span>
								<span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
									<svg
										className="h-5 w-5 text-gray-400"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
									>
										<path
											fillRule="evenodd"
											d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
											clipRule="evenodd"
										/>
									</svg>
								</span>
							</button>

							<ul
								className={`${
									selectOpen
										? "opacity-100 visible"
										: "hidden opacity-0 invisible"
								} absolute duration-500 transition min-h-[16rem] transform z-10 mt-1 h-full w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}
							>
								{filCourses.map((course) => (
									<li
										onClick={
											!loading
												? () => {
														setSelectedCourse(course);
														setSelectOpen(false);
												  }
												: undefined
										}
										key={course.id}
										className="hover:bg-primary-600 hover:text-white text-gray-900 relative cursor-pointer select-none py-2 pl-3 pr-9"
										id="listbox-option-0"
										role="option"
									>
										<div className="flex items-center">
											<span
												className={`${
													selectedCourse && course.id === selectedCourse.id
														? "font-semibold"
														: "font-normal"
												} ml-3 block truncate`}
											>
												{course.name}
											</span>
										</div>
										{selectedCourse && course.id === selectedCourse.id && (
											<span className="text-primary-600 absolute inset-y-0 right-0 flex items-center pr-4">
												<svg
													className="h-5 w-5"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 20 20"
													fill="currentColor"
													aria-hidden="true"
												>
													<path
														fillRule="evenodd"
														d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
														clipRule="evenodd"
													/>
												</svg>
											</span>
										)}
									</li>
								))}
							</ul>
						</div>
						{selectedCourse && (
							<div className="mt-5 w-full">
								<div className="bg-white border border-gray-100 duration-500 flex items-center p-3 rounded-lg shadow-l">
									<span
										className={`${
											selectedCourse.name.length > 65 ? "w-[4rem]" : "w-[3rem]"
										} bg-gray-200 flex items-center justify-center font-bold h-[3rem] min-w-[3rem] rounded-full mr-1 text-gray-600 text-xl uppercase`}
									>
										{selectedCourse.name[0].toUpperCase()}
									</span>
									<p className="font-semibold ml-1 text-gray-700 text-sm tracking-wider md:text-base">
										{selectedCourse.name}
									</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</DialogBody>
			<DialogFooter>
				<Button
					disabled={loading}
					variant="text"
					color="red"
					onClick={
						!loading
							? () => {
									setSelectOpen(false);
									setSelectedCourse(null);
									setSearch("");
							  }
							: undefined
					}
					className="mr-1"
				>
					<span>Cancel</span>
				</Button>
				<Button
					disabled={loading}
					variant="gradient"
					color="blue"
					onClick={
						!loading
							? () => {
									if (selectedCourse) {
										register(selectedCourse.id);
									} else {
										toast.warning("Select a course to register");
									}
							  }
							: undefined
					}
				>
					<span>{loading ? "Registering..." : "Register"}</span>
				</Button>
			</DialogFooter>
		</Dialog>
	);
}

function useRegisterCourseRequest({ onSuccess, onError }) {
	const [loading, setLoading] = React.useState(false);

	const { data } = useAuthContext();

	const register = React.useCallback((id) => {
		setLoading(true);
		fetch(REGISTER_COURSE_URL(id), {
			method: "POST",
			headers: {
				Accept: "application/json",
				Authorization: "Bearer " + data?.token,
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.status_code === 200) {
					onSuccess();
				} else {
					onError("An error occurred. Unable to register for this course!");
				}
			})
			.catch((error) => {
				onError("A server error occurred. Unable to register for this course!");
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return {
		loading,
		register,
	};
}

export default RegisterForm;
