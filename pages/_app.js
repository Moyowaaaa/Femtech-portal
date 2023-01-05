import { ThemeProvider } from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <CheckAuth admin={Component.adminAuth || false}>
          {Component.authRequired === false ? (
            <NotAuthenticated admin={Component.adminAuth || false}>
              {Component.Layout ? (
                <Component.Layout>
                  <Component {...pageProps} />
                </Component.Layout>
              ) : (
                <Component {...pageProps} />
              )}
            </NotAuthenticated>
          ) : Component.authRequired === true ? (
            <Authenticated admin={Component.adminAuth || false}>
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
          <ToastContainer />
        </CheckAuth>
      </GlobalContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
