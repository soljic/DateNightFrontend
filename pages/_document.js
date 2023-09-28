import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          /> */}
          {/* <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&amp;display=swap"
            rel="stylesheet"
          /> */}
          {/* <!-- Google font --> */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin={""}
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;500&display=swap"
            rel="stylesheet"
          />
          {process.env.NEXT_FACEBOOK_DOMAIN_ID && (
            <meta
              name="facebook-domain-verification"
              content={`${process.env.NEXT_FACEBOOK_DOMAIN_ID}`}
            />
          )}
          {process.env.NEXT_PUBLIC_GTAG_ID && (
            <Script
              strategy="beforeInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTAG_ID}`}
            />
          )}
          {process.env.NEXT_PUBLIC_GTAG_ID && (
            <Script
              strategy="beforeInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                
                  gtag('config', '${process.env.NEXT_PUBLIC_GTAG_ID}');
                  `,
              }}
            />
          )}
        </Head>
        <body className="bg-sp-day-50 dark:bg-sp-black">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
