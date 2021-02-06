import Head from "next/head";
import { AppInitialProps } from "next/app";
import { AuthProvider } from "src/contexts";
import { NextComponentType, NextPageContext } from "next";
import { Router } from "next/router";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "src/apollo";
import { ToastProvider } from "react-toast-notifications";
import { additionalType } from "src/utils";
import "../styles/tailwind.scss";
import "../styles/react-select.scss";

type AppProps<P = {}> = AppInitialProps & {
  Component: NextComponentType<NextPageContext, any, P> & additionalType;
  router: Router;
};

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo();
  return (
    <>
      <Head>
        <title>{Component.title ?? "Places to see"}</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <AuthProvider>
        <ApolloProvider client={client}>
          <ToastProvider
            autoDismiss={true}
            autoDismissTimeout={4000}
            transitionDuration={150}
          >
            <Component {...pageProps} />
          </ToastProvider>
        </ApolloProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
