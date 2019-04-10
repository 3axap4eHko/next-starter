import React, { Component } from 'react';
import Head from 'next/head';
import Helmet from 'react-helmet';
import { ApolloProvider, getDataFromTree } from 'react-apollo/index';
import { ThemeProvider } from 'react-jss';
import createApolloClient from '../utils/createApolloClient';
import getInitialProps from '../utils/getInitialProps';
import theme from '../theme';

export default WrappedComponent => {
  const componentName = WrappedComponent.displayName || WrappedComponent.name;

  class WithData extends Component {
    static displayName = `withData(${componentName})`;
    static WrappedComponent = WrappedComponent;

    static async getPageProps(ctx) {
      return getInitialProps(WrappedComponent, ctx);
    }

    static renderComponent({ router, apolloClient, theme, ...props }) {
      return (
        <ThemeProvider theme={theme}>
          <ApolloProvider client={apolloClient}>
            <WrappedComponent {...props} router={router} />
          </ApolloProvider>
        </ThemeProvider>
      );
    }

    static async getServerInitialProps({ Component, router, ctx }) {
      const pageProps = await WithData.getPageProps({ Component, router, ctx });
      const apolloClient = createApolloClient({});

      try {
        const app = WithData.renderComponent({
          ...pageProps,
          Component,
          router,
          apolloClient,
          theme,
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
        theme,
        apolloState,
      };
    }

    static async getClientInitialProps({ Component, router, ctx }) {
      const { theme, apolloState } = __NEXT_DATA__.props;

      const pageProps = await WithData.getPageProps({ Component, router, ctx });

      return {
        ...pageProps,
        theme,
        apolloState,
      };
    }

    static async getInitialProps({ Component, router, ctx }) {
      return process.browser ? WithData.getClientInitialProps({ Component, router, ctx }) : WithData.getServerInitialProps({ Component, router, ctx });
    }

    // Server Side Transfer
    apolloClient = createApolloClient(this.props.apolloState, this.props.config);
    theme = this.props.theme;

    render() {

      return WithData.renderComponent({
        ...this.props,
        apolloClient: this.apolloClient,
        theme: this.theme,
      });
    };
  }

  return WithData;
};