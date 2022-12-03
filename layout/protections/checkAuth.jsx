import React from 'react';

import { useAuthContext } from '../../store/contexts';
import { SplashScreen } from '../../utils';

const CheckAuth = ({
	children
}) => {
	const { login, logout } = useAuthContext();
	const [loading, setLoading] = React.useState(true)

	React.useEffect(() => {
		const user = localStorage.getItem('user')
		if (user) {
			login(JSON.parse(user))
		} else {
			logout()
		}
		setLoading(false)
	}, [login, logout])

	return loading ? (
		<SplashScreen />
	) : (
		<React.Fragment>{children}</React.Fragment>
	);
};

export default CheckAuth;
