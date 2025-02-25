// _document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Meta tags for SEO and responsive design */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Creative freedom and the pursuit of improving how things work." />
        <meta name="keywords" content="portfolio, AI, generative art, development, coding, projects" />
        <meta name="author" content="John Li" />

        {/* Favicon */}
        <link rel="icon" href="/assets/images/icogo150.png" />

        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@200;300;400&display=swap"
          rel="stylesheet"
        />

        {/* Any additional global styles or external resources */}
      </Head>
      <body className="bg-slate-900 text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}