import { useRouter } from 'next/router';
import React from 'react';

import { ADMIN_LOGIN_PAGE, LOGIN_PAGE } from '../../config';
import { useAdminAuthContext, useAuthContext } from '../../store/contexts';
import { Navigate } from '../../utils';

const Authenticated = ({ admin = false, children }) => {
	const { auth: isAuthenticated, loading: isLoading } = useAuthContext();

	const { auth: isAdminAuthenticated, loading: isAdminLoading } = useAdminAuthContext();

	if (admin) {
		return isAdminLoading === false && isAdminAuthenticated ? (
			<React.Fragment>{children}</React.Fragment>
		) : isAdminLoading === false && isAdminAuthenticated === false ? (
			<Navigate to={ADMIN_LOGIN_PAGE} />
		) : (
			<></>
		);
	} else {
		return isLoading === false && isAuthenticated ? (
			<React.Fragment>{children}</React.Fragment>
		) : isLoading === false && isAuthenticated === false ? (
			<Navigate to={LOGIN_PAGE} />
		) : (
			<></>
		);
	}
};

export default Authenticated;
