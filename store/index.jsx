import { AdminAuthProvider, AuthProvider } from './contexts';

function GlobalProvider({ children }) {
	return (
		<AdminAuthProvider>
			<AuthProvider>{children}</AuthProvider>
		</AdminAuthProvider>
	);
}

export default GlobalProvider;
