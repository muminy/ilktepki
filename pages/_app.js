import Head from "next/head";

import "styles/global.css";
import "styles/bootstrap.css";
import "styles/responsive.css";
import { AuthProvider } from "context/Auth";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <meta
          id="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover"
        />
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
