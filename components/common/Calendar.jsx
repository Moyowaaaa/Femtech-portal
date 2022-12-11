import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const Body = ({ changeFn, list, title }) => (
	<div className="flex flex-col justify-start p-2">
		<p className="card-heading">{title}</p>
		<div className="bg-gray-100 gap-2 grid grid-cols-4 p-2">
			{list.map((item, index) => (
				<div
					className="bg-white cursor-pointer flex items-center justify-center py-2 text-gray-700 hover:bg-gray-300 hover:text-white"
					onClick={() => changeFn(item.value)}
					key={index}
				>
					<span className="font-medium text-center text-base tracking-wider md:text-lg">
						{item.key}
					</span>
				</div>
			))}
		</div>
	</div>
);

const Months = ({ changeMonth }) => {
	const list = months.map((month, index) => ({
		value: index,
		key: month.slice(0, 3),
	}));
	return <Body changeFn={changeMonth} list={list} title="select month" />;
};

const Years = ({ changeYear }) => {
	// const currentYear = new Date().getFullYear() + 10;
	const currentYear = new Date().getFullYear();
	const firstYear = new Date(0).getFullYear();
	let list = [];
	for (let i = firstYear; i <= currentYear; i++) {
		list.push({ key: i, value: i });
	}
	return (
		<Body changeFn={changeYear} list={list.reverse()} title="select year" />
	);
};

const arrowClasses =
	"flex justify-center h-full py-2 text-center text-xs w-[10%] md:text-sm";

const Topbar = ({
	disabled,
	onTitleClick,
	onLeftClick,
	onRightClick,
	title,
}) => (
	<div className="bg-white flex items-center w-full">
		<div
			onClick={onLeftClick}
			className={`${
				disabled.left
					? "bg-gray-500 cursor-not-allowed invisible text-gray-50"
					: "cursor-pointer text-primary-500 hover:bg-gray-100"
			} ${arrowClasses}`}
		>
			<span>
				<FaChevronLeft />
			</span>
		</div>
		<div
			onClick={onTitleClick}
			className="cursor-pointer flex justify-center h-full py-2 text-center w-[80%] hover:bg-gray-50"
		>
			<span className="cursor-pointer font-semibold text-gray-700 text-sm tracking-wider md:text-base">
				{title}
			</span>
		</div>
		<div
			onClick={onRightClick}
			className={`${
				disabled.right
					? "bg-gray-500 cursor-not-allowed invisible text-gray-50"
					: "cursor-pointer text-primary-500 hover:bg-gray-100"
			} ${arrowClasses}`}
		>
			<span>
				<FaChevronRight />
			</span>
		</div>
	</div>
);

const Days = ({
	changeYear,
	changeMonth,
	changeScreen,

	days: numberOfDays, // number of days in the month
	month,
	year,

	attendance = [], // days attendance where taken for the month
	today
}) => {
	const firstYear = new Date(0).getFullYear();
	// const currentYear = new Date().getFullYear() + 10;
	const currentYear = new Date().getFullYear();

	const todayDate = today.getDate();
	const todayMonth = today.getMonth();
	const todayYear = today.getFullYear();

	return (
		<div className="divide-y divide-gray-300 divide-opacity-50 w-full">
			{/* Display Year and Range Controller Start */}
			<Topbar
				disabled={{
					left: firstYear === year,
					right: currentYear === year,
				}}
				onTitleClick={() => changeScreen("years")}
				onLeftClick={() => year > firstYear && changeYear(year - 1)}
				onRightClick={() => year < currentYear && changeYear(year + 1)}
				title={year}
			/>
			{/* Display Year and Range Controller End */}

			{/* Display Month and Range Controller Start */}
			<Topbar
				disabled={{
					left: month === 0,
					right: month === 11,
				}}
				onTitleClick={() => changeScreen("months")}
				onLeftClick={() => month > 0 && changeMonth(month - 1)}
				onRightClick={() => month < 11 && changeMonth(month + 1)}
				title={months[month]}
			/>
			{/* Display Month and Range Controller End */}

			{/* Display Grid of number of days Start */}
			<div className="gap-1 grid grid-cols-6 min-h-[16rem] px-1 pt-3 pb-1">
				{Array.from(Array(numberOfDays).keys()).map((num) => {
					const date = { date: num + 1, month, year };
					const today = { date: todayDate, month: todayMonth, year: todayYear };

					const attendanceDate = attendance.length > 0 ? attendance.find((attendanceInstance) => {
						const attend = new Date(attendanceInstance.created_at);
						if (
							attend.getDate() === date.date &&
							attend.getMonth() === date.month &&
							attend.getFullYear() === date.year
						)
							return attendanceInstance;
					}) : null;

					return (
						<Day
							key={date.date}
							date={date}
							attendance={attendanceDate}
							today={today}
						/>
					);
				})}
				{/* Display Grid of number of days End */}
			</div>
		</div>
	);
};

const Day = ({ attendance, date, today }) => {
	
	const color = React.useMemo(() => {
		if (attendance) {
			if (attendance.signIn_time && attendance.signOut_time) return "bg-green-700 text-gray-50";
			if (attendance.signIn_time) {

				const attendanceDate = new Date(attendance.created_at);
				attendanceDate.setHours(0, 0, 0, 0);

				const nextDate = new Date((24 * 60 * 60 * 1000) + attendanceDate.getTime())
				const currentDate = new Date()

				if (!attendance.signOut_time && currentDate.getTime() >= nextDate.getTime())
					return "bg-red-700 text-gray-50";
				return "bg-yellow-700 text-gray-50";
			} 
		}
		const isTodayDate = date.date === today.date && date.month === today.month && date.year === today.year ? true : false;
		if (isTodayDate) return "bg-blue-700 text-gray-50";
		return "bg-white text-gray-600";
	}, [attendance, date, today])

	return (
		<div className="flex items-center justify-center p-1">
			<span
				className={`${color} flex font-medium h-[34px] items-center justify-center rounded-full shadow-lg text-sm w-[40px] md:text-base`}
			>
				{`${date.date > 9 ? "" : "0"}${date.date}`}
			</span>
		</div>
	);
};

const Calendar = ({ attendance }) => {
	const date = new Date();

	const [month, setMonth] = React.useState(date.getMonth());
	const [year, setYear] = React.useState(date.getFullYear());

	const [screen, setScreen] = React.useState("days");

	// Get the number of days for the current month
	const days = React.useMemo(() => {
		const mthStrDate = new Date(year, month, 1);
		const nextMonth = month > 11 ? 0 : month + 1;
		const nextYear = month > 11 ? year + 1 : year;
		const mthEndDate = new Date(nextYear, nextMonth, 1);
		return (
			(mthEndDate.getTime() - mthStrDate.getTime()) / (1000 * 60 * 60 * 24)
		);
	}, [month, year]);

	return (
		<div className="bg-gray-50 h-full min-h-[18rem] max-h-[26.5rem] overflow-y-auto p-2 rounded-lg w-full">
			{screen === "years" ? (
				<Years
					changeYear={(day) => {
						setYear(day);
						setScreen("days");
					}}
				/>
			) : screen === "months" ? (
				<Months
					changeMonth={(month) => {
						setMonth(month);
						setScreen("days");
					}}
				/>
			) : (
				<Days
					changeScreen={(screen) => setScreen(screen)}
					changeMonth={(e) => setMonth(e)}
					changeYear={(e) => setYear(e)}

					days={days} // number of days in the current month
					month={month}
					year={year}

					today={date}
					attendance={attendance}
				/>
			)}
		</div>
	);
};

export default Calendar;
