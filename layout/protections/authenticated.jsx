import { useRouter } from 'next/router';
import React from 'react';

import { LOGIN_PAGE } from '../../config';
import { useAuthContext } from '../../store/contexts';
import { Navigate } from '../../utils';

const Authenticated = ({ children }) => {
	const { auth: isAuthenticated, loading: isLoading } = useAuthContext();

	return isLoading === false && isAuthenticated ? (
		<React.Fragment>{children}</React.Fragment>
	) : isLoading === false && isAuthenticated === false ? (
		<Navigate to={LOGIN_PAGE} />
	) : (
		<></>
	);
};

export default Authenticated;
