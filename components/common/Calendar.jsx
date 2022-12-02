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

	days,
	month,
	year,
}) => {
	const firstYear = new Date(0).getFullYear();
	// const currentYear = new Date().getFullYear() + 10;
	const currentYear = new Date().getFullYear();

	const today = new Date();
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
				{Array.from(Array(days).keys()).map((num) => {
					const date = num + 1;

					const isTodayDate =
						date === todayDate && month === todayMonth && year === todayYear
							? true
							: false;

					return (
						<div key={date} className="flex items-center justify-center p-1">
							<span
								className={`${
									isTodayDate
										? "bg-green-700 text-gray-50"
										: "bg-white text-gray-600"
								} font-medium inline-block px-2 py-[0.3125rem] rounded-full shadow-lg text-sm md:text-base`}
							>
								{`${date > 9 ? "" : "0"}${date}`}
							</span>
						</div>
					);
				})}
				{/* Display Grid of number of days Start */}
			</div>
		</div>
	);
};

const Calendar = () => {
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
		return (mthEndDate.getTime() - mthStrDate.getTime()) / (1000 * 60 * 60 * 24);
	}, [month, year])

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
				/>
			)}
		</div>
	);
};

export default Calendar;

// import React, { useEffect, useState } from "react";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// export const months = [
// 	"January",
// 	"February",
// 	"March",
// 	"April",
// 	"May",
// 	"June",
// 	"July",
// 	"August",
// 	"September",
// 	"October",
// 	"November",
// 	"December",
// ];

// const Body = ({ changeFn, list, title }) => (
// 	<div className="flex flex-col justify-start p-2">
// 		<p className="card-heading">{title}</p>
// 		<div className="bg-gray-100 gap-2 grid grid-cols-4 p-2">
// 			{list.map((item, index) => (
// 				<div
// 					className="bg-white cursor-pointer flex items-center justify-center py-2 text-gray-700 hover:bg-gray-300 hover:text-white"
// 					onClick={() => changeFn(item.value)}
// 					key={index}
// 				>
// 					<span className="font-medium text-center text-base tracking-wider md:text-lg">
// 						{item.key}
// 					</span>
// 				</div>
// 			))}
// 		</div>
// 	</div>
// );

// const Months = ({ changeMonth }) => {
// 	const list = months.map((month, index) => ({
// 		value: index,
// 		key: month.slice(0, 3),
// 	}));
// 	return <Body changeFn={changeMonth} list={list} title="select month" />;
// };

// const Years = ({ changeYear }) => {
// 	// const currentYear = new Date().getFullYear() + 10;
// 	const currentYear = new Date().getFullYear();
// 	const firstYear = new Date(0).getFullYear();
// 	let list = [];
// 	for (let i = firstYear; i <= currentYear; i++) {
// 		list.push({ key: i, value: i });
// 	}
// 	return (
// 		<Body changeFn={changeYear} list={list.reverse()} title="select year" />
// 	);
// };

// const arrowClasses =
// 	"flex justify-center h-full py-2 text-center text-xs w-[10%] md:text-sm";

// const Topbar = ({
// 	disabled,
// 	onTitleClick,
// 	onLeftClick,
// 	onRightClick,
// 	title,
// }) => (
// 	<div className="bg-white flex items-center w-full">
// 		<div
// 			onClick={onLeftClick}
// 			className={`${
// 				disabled.left
// 					? "bg-gray-500 cursor-not-allowed invisible text-gray-50"
// 					: "cursor-pointer text-primary-500 hover:bg-gray-100"
// 			} ${arrowClasses}`}
// 		>
// 			<span>
// 				<FaChevronLeft />
// 			</span>
// 		</div>
// 		<div
// 			onClick={onTitleClick}
// 			className="cursor-pointer flex justify-center h-full py-2 text-center w-[80%] hover:bg-gray-50"
// 		>
// 			<span className="cursor-pointer font-semibold text-gray-700 text-sm tracking-wider md:text-base">
// 				{title}
// 			</span>
// 		</div>
// 		<div
// 			onClick={onRightClick}
// 			className={`${
// 				disabled.right
// 					? "bg-gray-500 cursor-not-allowed invisible text-gray-50"
// 					: "cursor-pointer text-primary-500 hover:bg-gray-100"
// 			} ${arrowClasses}`}
// 		>
// 			<span>
// 				<FaChevronRight />
// 			</span>
// 		</div>
// 	</div>
// );

// const Days = ({
// 	changeYear,
// 	changeMonth,
// 	changeDate,
// 	changeScreen,
// 	selectedDate,
// 	selectedMonth,
// 	selectedYear,
// 	days,
// 	month,
// 	year,
// }) => {
// 	const firstYear = new Date(0).getFullYear();
// 	// const currentYear = new Date().getFullYear() + 10;
// 	const currentYear = new Date().getFullYear();

// 	const today = new Date();
// 	const todayDate = today.getDate();
// 	const todayMonth = today.getMonth();
// 	const todayYear = today.getFullYear();

// 	return (
// 		<div className="divide-y divide-gray-300 divide-opacity-50 w-full">
// 			<Topbar
// 				disabled={{
// 					left: firstYear === year,
// 					right: currentYear === year,
// 				}}
// 				onTitleClick={() => changeScreen("years")}
// 				onLeftClick={() => year > firstYear && changeYear(year - 1)}
// 				onRightClick={() => year < currentYear && changeYear(year + 1)}
// 				title={year}
// 			/>
// 			<Topbar
// 				disabled={{
// 					left: month === 0,
// 					right: month === 11,
// 				}}
// 				onTitleClick={() => changeScreen("months")}
// 				onLeftClick={() => month > 0 && changeMonth(month - 1)}
// 				onRightClick={() => month < 11 && changeMonth(month + 1)}
// 				title={months[month]}
// 			/>
// 			<div className="gap-1 grid grid-cols-6 min-h-[16rem] px-1 pt-3 pb-1">
// 				{Array.from(Array(days).keys()).map((_day) => {
// 					const day = _day + 1;

// 					const active =
// 						day === todayDate && month === todayMonth && year === todayYear
// 							? true
// 							: false;
// 					const selected =
// 						day === selectedDate &&
// 						month === selectedMonth &&
// 						year === selectedYear
// 							? true
// 							: false;

// 					return (
// 						<div key={day} className="flex items-center justify-center p-1">
// 							<span
// 								onClick={() => changeDate(day)}
// 								className={`${
// 									selected
// 										? "bg-blue-700 text-gray-50 hover:bg-blue-600"
// 										: active
// 										? "bg-green-700 text-gray-50 hover:bg-green-600"
// 										: "bg-white text-gray-600 hover:bg-gray-50"
// 								} border-blue-700 cursor-pointer duration-300 font-medium inline-block px-2 py-[0.3125rem] rounded-full shadow-lg text-sm hover:border hover:scale-110 md:text-base`}
// 							>
// 								{`${day > 9 ? "" : "0"}${day}`}
// 							</span>
// 						</div>
// 					);
// 				})}
// 			</div>
// 		</div>
// 	);
// };

// const Calendar = () => {
// 	const date = new Date();
// 	const dateDate = date.getDate();
// 	const dateMonth = date.getMonth();
// 	const dateYear = date.getFullYear();

// 	const [screen, setScreen] = useState("days");

// 	const [days, setDays] = useState(31);
// 	const [month, setMonth] = useState(dateMonth);
// 	const [year, setYear] = useState(dateYear);

// 	const [day, setDay] = useState(dateDate);
// 	const [_month, _setMonth] = useState(dateMonth);
// 	const [_year, _setYear] = useState(dateYear);

// 	useEffect(() => {
// 		const mthStrDate = new Date(year, month, 1);
// 		const nextMonth = month > 11 ? 0 : month + 1;
// 		const nextYear = month > 11 ? year + 1 : year;
// 		const mthEndDate = new Date(nextYear, nextMonth, 1);
// 		const noOfDays =
// 			(mthEndDate.getTime() - mthStrDate.getTime()) / (1000 * 60 * 60 * 24);
// 		setDays(noOfDays);
// 	}, [month, year]);

// 	return (
// 		<div className="bg-gray-50 h-full min-h-[18rem] max-h-[26.5rem] overflow-y-auto p-2 rounded-lg w-full">
// 			{screen === "years" ? (
// 				<Years
// 					changeYear={(index) => {
// 						setScreen("days");
// 						setYear(index);
// 					}}
// 				/>
// 			) : screen === "months" ? (
// 				<Months
// 					changeMonth={(index) => {
// 						setScreen("days");
// 						setMonth(index);
// 					}}
// 				/>
// 			) : (
// 				<Days
// 					changeScreen={(src) => setScreen(src)}
// 					selectedDate={day}
// 					selectedMonth={_month}
// 					selectedYear={_year}
// 					days={days}
// 					month={month}
// 					year={year}
// 					changeDate={(e) => {
// 						setDay(e);
// 						_setMonth(month);
// 						_setYear(year);
// 					}}
// 					changeMonth={(e) => setMonth(e)}
// 					changeYear={(e) => setYear(e)}
// 				/>
// 			)}
// 		</div>
// 	);
// };

// export default Calendar;
