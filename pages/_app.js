import { ThemeProvider } from "next-themes";
import { appWithTranslation } from "next-i18next";

import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} refetchInterval={0}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
      >
        <Component {...pageProps} />{" "}
      </ThemeProvider>
    </SessionProvider>
  );
}

export default appWithTranslation(MyApp);
