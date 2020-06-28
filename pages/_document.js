import fetch from 'isomorphic-fetch';
import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import theme from '../theme';

global.fetch = fetch;

export default class Doc extends Document {

  render() {
    const { } = this.props;

    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
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
