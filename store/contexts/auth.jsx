import {
	createContext,
	useCallback,
	useContext,
	useState,
} from 'react';

export const AuthContext = createContext(null);

export const useAuthContext = () => {
	return useContext(AuthContext)
};

function AuthProvider({ children }) {
	const [data, setData] = useState();
	const [loading, setLoading] = useState(true);
	const [auth, setAuth] = useState(false);

	const login = useCallback((userData) => {
		localStorage.setItem('user', JSON.stringify(userData))
		setData(userData);
		setLoading(false);
		setAuth(true);
	}, []);

	const logout = useCallback(() => {
		localStorage.removeItem('user')
		setLoading(false);
		setAuth(false);
		setData(undefined);
	}, []);

	return (
		<AuthContext.Provider
			value={{
				auth,
				data,
				loading,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
