import Script from "next/script";
import Document, { Html, Head, Main, NextScript } from "next/document";

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
          <link
            rel="stylesheet"
            href="https://unpkg.com/swiper@7/swiper-bundle.min.css"
          />

          <Script
            strategy="beforeInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-2SXNVG0CD9"
          />
          <Script
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                
                  gtag('config', 'G-2SXNVG0CD9');
                  `,
            }}
          />
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
