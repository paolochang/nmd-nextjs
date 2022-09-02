import Layout from "../components/Layout";
import Head from "next/head";
import "../styles/globals.css";
import { MovieProvider } from "../context/movie";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <MovieProvider>
        <Component {...pageProps} />
      </MovieProvider>
    </Layout>
  );
}

export default MyApp;
