import "../styles/globals.css";

// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";

// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css";

// used for collection views (optional)
import "rc-dropdown/assets/index.css";

// used for rendering equations (optional)
import "katex/dist/katex.min.css";

import type { AppProps } from "next/app";
import Layout from "../components/layouts/Layout";
import { SiteContextProvider } from "../components/contexts/site/SiteContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SiteContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SiteContextProvider>
  );
}

export default MyApp;
