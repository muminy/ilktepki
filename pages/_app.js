import Head from "next/head";
import App from "next/app";
import "styles/global.css";
import { AuthTokenProvider } from "context/AuthToken";
import { parseCookies } from "helpers/parseCookie";

function MyApp({ Component, pageProps, JWT_TOKEN, USER_ID }) {
  return (
    <AuthTokenProvider InitialState={{ JWT_TOKEN, USER_ID }}>
      <Head>
        <meta
          id="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover"
        />
      </Head>
      <Component {...pageProps} />
    </AuthTokenProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  const cookies = parseCookies(appContext.ctx.req);
  console.log(cookies);
  return { ...appProps, JWT_TOKEN: cookies?.JWT_TOKEN, USER_ID: cookies?.USER_ID };
};

export default MyApp;
