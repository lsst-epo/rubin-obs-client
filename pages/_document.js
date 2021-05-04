import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import { getLangString } from "@/lib/utils";

const SHARETHIS_PROPERTY = process.env.NEXT_PUBLIC_SHARETHIS_PROPERTY;

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      const {
        query: { uriSegments },
      } = ctx;
      const lang = getLangString(uriSegments);
      return {
        ...initialProps,
        lang: lang,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang={this.props.lang}>
        <Head />
        <body>
          <Main />
          <NextScript />
          {SHARETHIS_PROPERTY && (
            <script
              type="text/javascript"
              src={`https://platform-api.sharethis.com/js/sharethis.js#property=${SHARETHIS_PROPERTY}&product=sop`}
              async="async"
            ></script>
          )}
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
