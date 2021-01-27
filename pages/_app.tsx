import { AppProps } from "next/app";
import { AuthProvider } from "src/auth/useAuth";
import Layout from "src/components/Layout";
import "../styles/tailwind.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
