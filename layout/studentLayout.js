import Image from 'next/image';
import Calendar from '../components/studentDashboard/Calendar'
import Events from '../components/studentDashboard/Events'
import Menu from "../components/studentDashboard/Menu";
import userProfileImage from '../images/profileImage.svg'

function StudentLayout({ children }) {
	return (
		<div className="flex justify-evenly h-screen w-full gap-3 p-4">
			<Menu />

			{children}
			<div className="w-4/12 flex flex-col gap-6">
				<div className="shadow rounded-md  w-full py-2 flex justify-between items-center pr-6 pl-24 text-xl font-semibold">
					HEY, John
					<div className="w-[5rem] h-[5rem] rounded-full">
						<Image src={userProfileImage} />
					</div>
				</div>
				<Events />
				<Calendar />
			</div>
		</div>
	);
}

export default StudentLayout;
