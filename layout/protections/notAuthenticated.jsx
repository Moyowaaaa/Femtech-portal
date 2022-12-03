import * as routes from '../../config/routes';
import { useAuthContext } from '../../store/contexts';
import { Navigate } from '../../utils';

const NotAuthenticated = ({ children }) => {
	const { auth: isAuthenticated, loading: isLoading } = useAuthContext();

	return isLoading === false && isAuthenticated === false ? (
		<React.Fragment>{children}</React.Fragment>
	) : isLoading === false && isAuthenticated ? (
		<Navigate
			to={routes.DASHBOARD_PAGE}
			query={undefined} // remove the query object
		/>
	) : (
		<></>
	);
};

export default NotAuthenticated;
