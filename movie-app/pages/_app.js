import Layout from "../components/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import { MovieProvider } from "../context/movie";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <MovieProvider>
        <Component key={router.asPath} {...pageProps} />
      </MovieProvider>
    </Layout>
  );
}

export default MyApp;
