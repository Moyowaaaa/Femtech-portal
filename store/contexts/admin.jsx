import {
	createContext,
	useCallback,
	useContext,
	useState,
} from 'react';

export const AdminAuthContext = createContext(null);

export const useAdminAuthContext = () => {
	return useContext(AdminAuthContext)
};

function AdminAuthProvider({ children }) {
	const [data, setData] = useState();
	const [loading, setLoading] = useState(true);
	const [auth, setAuth] = useState(false);

	const login = useCallback((userData) => {
		localStorage.setItem('admin', JSON.stringify(userData))
		setData(userData);
		setLoading(false);
		setAuth(true);
	}, []);

	const logout = useCallback(() => {
		localStorage.removeItem('admin')
		setLoading(false);
		setAuth(false);
		setData(undefined);
	}, []);

	return (
		<AdminAuthContext.Provider
			value={{
				auth,
				data,
				loading,
				login,
				logout,
			}}
		>
			{children}
		</AdminAuthContext.Provider>
	);
};

export default AdminAuthProvider;
