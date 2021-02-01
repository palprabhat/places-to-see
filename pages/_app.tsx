import Head from "next/head";
import { AppInitialProps } from "next/app";
import { AuthProvider } from "src/contexts";
import Layout from "src/components/Layout";
import "../styles/tailwind.scss";
import "../styles/react-select.scss";
import { NextComponentType, NextPageContext } from "next";
import { Router } from "next/router";

type additionalType = {
  title: string;
  withMapView: boolean;
};

type AppProps<P = {}> = AppInitialProps & {
  Component: NextComponentType<NextPageContext, any, P> & additionalType;
  router: Router;
  __N_SSG?: boolean | undefined;
  __N_SSP?: boolean | undefined;
};

function MyApp({ Component, pageProps }: AppProps) {
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
        <Layout withMapView={Component.withMapView}>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </>
  );
}

export default MyApp;
