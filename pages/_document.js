import fetch from 'isomorphic-unfetch';
import React from 'react';
import { object } from 'prop-types';
import Helmet from 'react-helmet';
import Document, { Head, Main, NextScript } from 'next/document';
import { JssProvider, SheetsRegistry } from 'react-jss';
import { createGenerateClassName } from '@material-ui/core/styles';

global.fetch = fetch;

export default class Doc extends Document {

  static async getInitialProps(ctx) {
    const { renderPage } = ctx;
    const sheets = new SheetsRegistry();

    const app = App => props => {
      return (
        <JssProvider registry={sheets} generateClassName={createGenerateClassName()}>
          <App {...props} />
        </JssProvider>
      );
    };
    const renderedPage = await renderPage(app);
    const helmet = Helmet.renderStatic();

    return { ...renderedPage, sheets, helmet };
  }

  get helmetHtmlAttrs() {
    return this.props.helmet.htmlAttributes.toComponent();
  }

  get helmetBodyAttrs() {
    return this.props.helmet.bodyAttributes.toComponent();
  }

  get helmetHead() {
    return Object.keys(this.props.helmet)
      .filter(el => el !== 'htmlAttributes' && el !== 'bodyAttributes')
      .map(el => this.props.helmet[el].toComponent());
  }

  render() {
    const { sheets } = this.props;

    return (
      <html {...this.helmetHtmlAttrs}>
      <Head>
        {this.helmetHead}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <style type="text/css" data-meta="jss-ssr" id="ssr-styles" dangerouslySetInnerHTML={{ __html: sheets.toString() }} />
      </Head>
      <body {...this.helmetBodyAttrs}>
      <Main />
      <NextScript />
      </body>
      </html>
    );
  }
}