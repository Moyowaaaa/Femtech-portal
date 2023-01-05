import React from 'react';

import { useAdminAuthContext, useAuthContext } from '../../store/contexts';
import { SplashScreen } from '../../utils';

const CheckAuth = ({
	admin = false,
	children
}) => {
	const { login, logout } = useAuthContext();
	const { login: adminLogin, logout: adminLogout } = useAdminAuthContext();

	const [loading, setLoading] = React.useState(true)

	React.useEffect(() => {
		setLoading(true)
		if (admin) {
			const admin = localStorage.getItem('admin')
			if (admin) {
				adminLogin(JSON.parse(admin))
			} else {
				adminLogout()
			}
		} else {
			const user = localStorage.getItem('user')
			if (user) {
				login(JSON.parse(user))
			} else {
				logout()
			}
		}
		setLoading(false)
	}, [admin, adminLogin, adminLogout login, logout])

	return loading ? (
		<SplashScreen />
	) : (
		<React.Fragment>{children}</React.Fragment>
	);
};

export default CheckAuth;
