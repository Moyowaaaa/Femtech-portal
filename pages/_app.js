import { ThemeProvider } from "@material-tailwind/react";

import {
  Authenticated,
  CheckAuth,
  NotAuthenticated,
} from "../layout/protections";
import GlobalContextProvider from "../store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <GlobalContextProvider>
        <CheckAuth>
          {Component.authRequired === false ? (
            <NotAuthenticated>
              {Component.Layout ? (
                <Component.Layout>
                  <Component {...pageProps} />
                </Component.Layout>
              ) : (
                <Component {...pageProps} />
              )}
            </NotAuthenticated>
          ) : Component.authRequired === true ? (
            <Authenticated>
              {Component.Layout ? (
                <Component.Layout>
                  <Component {...pageProps} />
                </Component.Layout>
              ) : (
                <Component {...pageProps} />
              )}
            </Authenticated>
          ) : Component.Layout ? (
            <Component.Layout>
              <Component {...pageProps} />
            </Component.Layout>
          ) : (
            <Component {...pageProps} />
          )}
        </CheckAuth>
      </GlobalContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
