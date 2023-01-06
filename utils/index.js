export { default as Navigate } from './Navigate';
export { default as SplashScreen } from './SplashScreen';

export const getNextDate = (date, nod = 1, str = false) => {
	// nod => no_of_days
	const number_of_days = nod * 24 * 60 * 60 * 1000;
	const dateTime =
		date === undefined
			? new Date()
			: typeof date === "string"
			? new Date(date)
			: date;
	dateTime.setHours(0, 0, 0, 0);

	const nd = new Date(number_of_days + dateTime.getTime());
	return str ? nd.toLocaleDateString("en-CA") : nd;
};