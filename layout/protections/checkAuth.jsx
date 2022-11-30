import React from 'react';

import { useAuthContext } from '../../store/contexts';
import { SplashScreen } from '../../utils';

const CheckAuth = ({
	children
}) => {
	const { login, logout } = useAuthContext();
	const [loading, setLoading] = React.useState(true)

	React.useEffect(() => {
		setTimeout(() => {
			setLoading(false)
			logout()
		}, 3000)
	}, [logout])

	return loading ? (
		<SplashScreen />
	) : (
		<React.Fragment>{children}</React.Fragment>
	);
};

export default CheckAuth;
