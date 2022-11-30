import { useRouter } from 'next/router';
import React from 'react';

import * as routes from '../../config/routes';
import { useAuthContext } from '../../store/contexts';
import { Navigate } from '../../utils';

const NotAuthenticated = ({ children }) => {
	const [nextRoute, setNextRoute] = React.useState(routes.DASHBOARD_PAGE);

	const { auth: isAuthenticated, loading: isLoading } = useAuthContext();

	const { query } = useRouter();

	React.useEffect(() => {
		const unsafeCheckRoute = (url, routes) => {
			let route = '/' + url.split('/')[1] + '/';
			if (routes.includes(route)) return url;
			return null;
		};

		const checkRoute = () => {
			const arrayRoutes = Object.values(routes);
			const filteredRoutes = arrayRoutes.map((route) => {
				if (typeof route === 'function') return route('slug');
				else return route;
			});

			let _nextRoute = routes.DASHBOARD_PAGE;

			if (query?.next !== undefined && typeof query.next === 'string')
				_nextRoute = query.next;
			// Add a slash to the end of the url if not home page
			if (_nextRoute.slice(-1) !== '/' && _nextRoute !== '/') _nextRoute += '/';
			// Check route is not the home page
			if (_nextRoute !== '/' && _nextRoute[0] !== '/')
				_nextRoute = '/' + _nextRoute;
			if (filteredRoutes.includes(_nextRoute)) setNextRoute(_nextRoute);
			else {
				const route = unsafeCheckRoute(_nextRoute, filteredRoutes);
				if (route !== null) setNextRoute(route);
				else setNextRoute(routes.HOME_PAGE_URL);
			}
		};
		checkRoute();
	}, [query]);

	return isLoading === false && isAuthenticated === false ? (
		<React.Fragment>{children}</React.Fragment>
	) : isLoading === false && isAuthenticated ? (
		<Navigate
			to={nextRoute}
			query={undefined} // remove the query object
		/>
	) : (
		<></>
	);
};

export default NotAuthenticated;
