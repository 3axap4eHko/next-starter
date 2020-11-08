import React from 'react';
import Application from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { ThemeProvider } from 'react-jss';
import { ApolloProvider } from '@apollo/client';
import { getDataFromTree } from '@apollo/client/react/ssr';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import createApolloClient from '../utils/createApolloClient';
import theme from '../theme';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

if (process.browser) {
  NProgress.start();
}

export default class App extends Application {
  static renderComponent({ apolloClient, Component, ...props }) {
    return (
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
          <Head>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
          </Head>
          <Component {...props} />
        </ApolloProvider>
      </ThemeProvider>
    );
  }

  static async getServerInitialProps({ Component, router, ctx }, pageProps) {
    const apolloClient = createApolloClient({});

    try {
      const app = App.renderComponent({
        ...pageProps,
        Component,
        router,
        apolloClient,
        traverse: true,
      });
      await getDataFromTree(app);
    } catch (error) {
      console.error('Error while running `getDataFromTree`', error);
    }

    Head.rewind();

    const apolloState = apolloClient.cache.extract();

    return {
      ...pageProps,
      apolloState,
    };
  }

  static async getClientInitialProps({ Component, router, ctx }, pageProps) {
    const { apolloState } = window.__NEXT_DATA__.props;

    return {
      ...pageProps,
      apolloState,
    };
  }

  static async getInitialProps({ Component, router, ctx }) {
    const initialProps = super.getInitialProps({ Component, router, ctx });

    return process.browser
      ? await App.getClientInitialProps({ Component, router, ctx }, initialProps)
      : await App.getServerInitialProps({ Component, router, ctx }, initialProps);
  }

  get apolloClient() {
    if (!this._apolloClient) {
      this._apolloClient = createApolloClient(this.props.apolloState);
    }
    return this._apolloClient;
  }

  componentDidMount() {
    NProgress.done();
    const ssrStyles = document.getElementById('ssr-styles');
    ssrStyles && document.head.removeChild(ssrStyles);
  }

  render() {
    return App.renderComponent({
      ...this.props,
      apolloClient: this.apolloClient,
      theme,
    });
  }
}
