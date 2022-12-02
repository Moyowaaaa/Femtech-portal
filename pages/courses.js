import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
} from "@material-tailwind/react";
import React from "react";
import Link from "next/link";

import { Select } from "../components/controls";
import Events from "../components/studentDashboard/Events";
import Layout from "../layout/studentLayout";

const courses = [
	{
		id: 1,
		title: "Learn in-demand skills with over 200,000 video courses",
	},
	{
		id: 2,
		title: "Choose couress taught by real-world experts",
	},
	{
		id: 3,
		title: "Learn at your own pace, with lifetime access on mobile and desktop",
	},
	{
		id: 4,
		title:
			"Choose from over 10,000,000 courses with new additions created every month",
	},
];

function Courses() {
	const [open, setOpen] = React.useState(false);
	const [course, setCourse] = React.useState("")
 
  const handleOpen = React.useCallback(() => setOpen(prevState => !prevState), []);

	return (
		<React.Fragment>
			<div className="w-6/12 px-5">
				<div className="mb-4">
					<Button color="blue" onClick={handleOpen}><span>Register a new course</span></Button>
				</div>
				{courses.map(({ id, title }, index) => (
					<Link href={`/attendance/${id}/`} key={index}>
						<a className="p-2 w-full">
							<div
								className="bg-white border border-gray-100 cursor-pointer duration-500 flex items-center p-3 rounded-lg shadow-l transition transform hover:scale-105 hover:bg-gray-100"
								key={index}
							>
								<span className={`${
									title.length > 65 ? "w-[4rem]" : "w-[3rem]"
								} bg-gray-200 flex items-center justify-center font-bold h-[3rem] min-w-[3rem] rounded-full mr-1 text-gray-600 text-xl uppercase`}>
									{title[0].toUpperCase()}
								</span>
								<p className="font-semibold ml-1 text-gray-700 text-sm tracking-wider md:text-base">
									{title}
								</p>
							</div>
						</a>
					</Link>
				))}
				<Dialog open={open} handler={handleOpen}>
					<DialogHeader>Register a new course</DialogHeader>
					<DialogBody divider>
						<div className="py-4 w-full">
							<Select 
								label="Select Course"
								options={[]}
								onChange={(value) => setCourse(value)}
								value={course}
							/>
						</div>
					</DialogBody>
					<DialogFooter>
						<Button
							variant="text"
							color="red"
							onClick={handleOpen}
							className="mr-1"
						>
							<span>Cancel</span>
						</Button>
						<Button variant="gradient" color="blue" onClick={handleOpen}>
							<span>Register</span>
						</Button>
					</DialogFooter>
				</Dialog>
			</div>
			<div className="w-3/12 flex flex-col gap-6">
				<div className="shadow rounded-md  w-full py-2 flex justify-between items-center pr-6 pl-24 text-xl font-semibold">
					HEY, John
					{/*<div className="w-[5rem] h-[5rem] rounded-full">
              <Image src={userProfileImage} alt="" />
            </div>*/}
				</div>
				<Events />
			</div>
		</React.Fragment>
	);
}

Courses.authRequired = true;
Courses.Layout = Layout;

export default Courses;
