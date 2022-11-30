import {
  Authenticated,
  CheckAuth,
  NotAuthenticated,
} from "../layout/protections";
import GlobalContextProvider from '../store';
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <GlobalContextProvider>
      <CheckAuth>
        {Component.authRequired === false ? (
          <NotAuthenticated>
            <Component {...pageProps} />
          </NotAuthenticated>
        ) : Component.authRequired === true ? (
          <Authenticated>
            <Component {...pageProps} />
          </Authenticated>
        ) : (
          <Component {...pageProps} />
        )}
      </CheckAuth>
    </GlobalContextProvider>
  );
}

export default MyApp;
