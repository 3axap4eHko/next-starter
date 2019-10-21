import fetch from 'isomorphic-fetch';
import React from 'react';
import Helmet from 'react-helmet';
import Document, { Head, Main, NextScript } from 'next/document';
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
      helmet: Helmet.renderStatic(),
      styles: (
        <>
          {initialProps.styles}
          <style type="text/css" data-meta="jss-ssr" id="ssr-styles"
                 dangerouslySetInnerHTML={{ __html: sheetsRegistry.toString() }} />
        </>
      ),
    };
  }

  get helmetHtmlAttrComponents() {
    return this.props.helmet.htmlAttributes.toComponent();
  }

  get helmetBodyAttrComponents() {
    return this.props.helmet.bodyAttributes.toComponent();
  }

  get helmetHeadComponents() {
    return Object.keys(this.props.helmet)
      .filter(el => el !== 'htmlAttributes' && el !== 'bodyAttributes')
      .map(el => this.props.helmet[el].toComponent());
  }

  render() {
    const {} = this.props;

    return (
      <html {...this.helmetHtmlAttrComponents}>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <meta name="theme-color" content={theme.palette.primary.main} />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        {this.helmetHeadComponents}
      </Head>
      <body {...this.helmetBodyAttrComponents}>
      <Main />
      <NextScript />
      </body>
      </html>
    );
  }
}
