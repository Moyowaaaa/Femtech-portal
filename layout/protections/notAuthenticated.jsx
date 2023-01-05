import React from "react";

import * as routes from '../../config/routes';
import { useAdminAuthContext, useAuthContext } from '../../store/contexts';
import { Navigate } from '../../utils';

const NotAuthenticated = ({ admin = false, children }) => {
	const { auth: isAuthenticated, loading: isLoading } = useAuthContext();
	const { auth: isAdminAuthenticated, loading: isAdminLoading } = useAdminAuthContext();

	if (admin) {
		return isAdminLoading === false && isAdminAuthenticated === false ? (
			<React.Fragment>{children}</React.Fragment>
		) : isAdminLoading === false && isAdminAuthenticated ? (
			<Navigate to={routes.ADMIN_DASHBOARD_PAGE} />
		) : (
			<></>
		);
	} else {
		return isLoading === false && isAuthenticated === false ? (
			<React.Fragment>{children}</React.Fragment>
		) : isLoading === false && isAuthenticated ? (
			<Navigate to={routes.DASHBOARD_PAGE} />
		) : (
			<></>
		);
	}
};

export default NotAuthenticated;
