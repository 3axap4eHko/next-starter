import fetch from 'isomorphic-fetch';
import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import Document, { Head, Main, NextScript } from 'next/document';
import { SheetsRegistry, JssProvider, createGenerateClassName } from 'react-jss';

global.fetch = fetch;

export default class Doc extends Document {

  static async getInitialProps(ctx) {
    const { renderPage } = ctx;
    const sheetsRegistry = new SheetsRegistry();
    const generateId = createGenerateClassName();

    ctx.renderPage = () => renderPage({
      enhanceApp: App => function (props) {
        return (
          <JssProvider registry={sheetsRegistry} generateId={generateId}>
            <App {...props} />
          </JssProvider>
        );
      },
    });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      helmet: Helmet.renderStatic(),
      styles: (
        <>
          {initialProps.styles}
          <style type="text/css" data-meta="jss-ssr" id="ssr-styles" dangerouslySetInnerHTML={{ __html: sheetsRegistry.toString() }} />
        </>
      ),
    }
  }

  get helmetHtmlAttrs() {
    return this.props.helmet.htmlAttributes.toComponent();
  }

  get helmetBodyAttrs() {
    return this.props.helmet.bodyAttributes.toComponent();
  }

  get helmetHeadComponents () {
    return Object.keys(this.props.helmet)
      .filter(el => el !== 'htmlAttributes' && el !== 'bodyAttributes')
      .map(el => this.props.helmet[el].toComponent())
  }

  render() {
    const { } = this.props;

    return (
      <html {...this.helmetHtmlAttrs}>
      <Head>
        {this.helmetHeadComponents}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <body {...this.helmetBodyAttrs}>
      <Main />
      <NextScript />
      </body>
      </html>
    );
  }
}
