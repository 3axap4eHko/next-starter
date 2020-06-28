import React, { Component } from 'react';
import Application from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { ThemeProvider } from '../components/useTheme';
import createApolloClient from '../utils/createApolloClient';
import theme from '../theme';

const _start = NProgress.start;
NProgress.start = function(...args) {
  console.log('START!', new Error().stack.split(/\n/g)[2]);
  _start.apply(this, args);
}
const _done = NProgress.done;
NProgress.done = function(...args) {
  console.log('DONE!', new Error().stack.split(/\n/g)[2]);
  _done.apply(this, args);
}

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
  }

  render() {
    return App.renderComponent({
      ...this.props,
      apolloClient: this.apolloClient,
      theme,
    });
  }
}
