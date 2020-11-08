import fetch from 'isomorphic-fetch';
import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { SheetsRegistry, JssProvider, createGenerateId } from 'react-jss';
import theme from '../theme';

global.fetch = fetch;

export default class Doc extends Document {

  static async getInitialProps(ctx) {
    const { renderPage } = ctx;
    const sheetsRegistry = new SheetsRegistry();
    const generateId = createGenerateId();

    ctx.renderPage = () => renderPage({
      enhanceApp: App => (props) => (
        <JssProvider registry={sheetsRegistry} generateId={generateId}>
          <App {...props} />
        </JssProvider>
      ),
    });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style type="text/css" data-meta="jss-ssr" id="ssr-styles"
                 dangerouslySetInnerHTML={{ __html: sheetsRegistry.toString() }} />
        </>
      ),
    };
  }

  render() {
    const { } = this.props;

    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content={theme.palette.primary.main} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
