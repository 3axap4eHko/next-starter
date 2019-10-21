import React, { Component } from 'react';
import Head from 'next/head';
import Helmet from 'react-helmet';
import HNRS from 'hoist-non-react-statics';
import { ThemeProvider } from 'react-jss';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import createApolloClient from '../utils/createApolloClient';
import theme from '../theme';

Helmet.prototype.shouldComponentUpdate = () => true; // fix for nextjs

export default WrappedComponent => {
  const componentName = WrappedComponent.displayName || WrappedComponent.name;

  return HNRS(class WithData extends Component {
    static displayName = `withData(${componentName})`;
    static WrappedComponent = WrappedComponent;

    static renderComponent({ router, apolloClient, ...props }) {
      return (
        <ThemeProvider theme={theme}>
          <ApolloProvider client={apolloClient}>
            <WrappedComponent {...props} router={router} />
          </ApolloProvider>
        </ThemeProvider>
      );
    }

    static async getServerInitialProps({ Component, router, ctx }, pageProps) {
      const apolloClient = createApolloClient({});

      try {
        const app = WithData.renderComponent({
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
      Helmet.rewind();

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
        ? await WithData.getClientInitialProps({ Component, router, ctx }, initialProps)
        : await WithData.getServerInitialProps({ Component, router, ctx }, initialProps);
    }

    get apolloClient() {
      if (!this._apolloClient) {
        this._apolloClient = createApolloClient(this.props.apolloState);
      }
      return this._apolloClient;
    }

    render() {

      return WithData.renderComponent({
        ...this.props,
        apolloClient: this.apolloClient,
        theme,
      });
    };
  }, WrappedComponent);
};
