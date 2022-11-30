import { AuthProvider } from './contexts';

function GlobalProvider({ children }) {
	return (
		<AuthProvider>{children}</AuthProvider>
	);
}

export default GlobalProvider;
