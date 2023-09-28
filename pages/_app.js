import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";
import { ThemeProvider } from "next-themes";

import CookieConsent from "@/components/banners/CookieConsent";
import { MediaSizeIndicator } from "@/components/layout/MediaSizeIndicator";

import nextI18nConfig from "../next-i18next.config";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session} refetchInterval={0}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
        <CookieConsent />
        <Component {...pageProps} /> <MediaSizeIndicator />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default appWithTranslation(MyApp, nextI18nConfig);
